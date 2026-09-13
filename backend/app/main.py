from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import httpx
import os
import json
from datetime import datetime

app = FastAPI(title="PennyStock AI Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = {}
scheduler = AsyncIOScheduler()

FINNHUB_KEY = os.getenv("FINNHUB_API_KEY", "demo")
TRACKED_STOCKS = ["AAPL", "TSLA", "AMD", "NVDA", "MSTR"]

@app.get("/")
async def root():
    return {
        "status": "online",
        "version": "1.0.0",
        "message": "PennyStock AI Advisor"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/top-3")
async def get_top_3():
    return cache.get("top_3", {"opportunities": [], "last_updated": None})

@app.get("/api/stocks")
async def get_all_stocks():
    stocks = []
    for ticker in TRACKED_STOCKS:
        data = cache.get(f"stock:{ticker}")
        if data:
            stocks.append(data)
    return {"stocks": stocks, "count": len(stocks)}

@scheduler.scheduled_job('interval', minutes=1)
async def fetch_market_data():
    async with httpx.AsyncClient() as client:
        for ticker in TRACKED_STOCKS:
            try:
                response = await client.get(
                    "https://finnhub.io/api/v1/quote",
                    params={"symbol": ticker, "token": FINNHUB_KEY},
                    timeout=5
                )
                if response.status_code == 200:
                    data = response.json()
                    cache[f"stock:{ticker}"] = {
                        "ticker": ticker,
                        "price": data.get("c", 0),
                        "change": data.get("d", 0),
                        "change_pct": data.get("dp", 0),
                        "high": data.get("h", 0),
                        "low": data.get("l", 0),
                        "timestamp": datetime.now().isoformat()
                    }
            except Exception as e:
                print(f"Error: {e}")

@scheduler.scheduled_job('interval', minutes=5)
async def calculate_rankings():
    stocks = []
    for ticker in TRACKED_STOCKS:
        stock = cache.get(f"stock:{ticker}")
        if stock:
            score = abs(stock.get("change_pct", 0)) * 10
            stock["score"] = min(100, score)
            stocks.append(stock)
    
    stocks.sort(key=lambda x: x.get("score", 0), reverse=True)
    top_3 = stocks[:3]
    
    cache["top_3"] = {
        "opportunities": [
            {
                "rank": idx + 1,
                "ticker": s["ticker"],
                "price": s["price"],
                "change_pct": s["change_pct"],
                "score": s["score"],
            }
            for idx, s in enumerate(top_3)
        ],
        "last_updated": datetime.now().isoformat()
    }

@app.on_event("startup")
async def startup():
    scheduler.start()
    await fetch_market_data()
    await calculate_rankings()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
