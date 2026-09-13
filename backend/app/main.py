from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PennyStock AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "online"}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/stocks")
async def get_stocks():
    return {
        "stocks": [
            {"ticker": "AAPL", "price": 180.50, "change": 2.3},
            {"ticker": "TSLA", "price": 245.00, "change": 5.1},
            {"ticker": "AMD", "price": 135.70, "change": -1.2},
        ]
    }
