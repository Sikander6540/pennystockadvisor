"use client";

import { useEffect, useState } from "react";

interface Stock {
  ticker: string;
  price: number;
  change_pct: number;
  score: number;
}

interface Opportunity {
  rank: number;
  ticker: string;
  price: number;
  change_pct: number;
  score: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const [top3, setTop3] = useState<Opportunity[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [top3Res, stocksRes] = await Promise.all([
          fetch(`${API_URL}/api/top-3`),
          fetch(`${API_URL}/api/stocks`),
        ]);

        if (top3Res.ok) {
          const data = await top3Res.json();
          setTop3(data.opportunities || []);
        }

        if (stocksRes.ok) {
          const data = await stocksRes.json();
          setAllStocks(data.stocks || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">🎯 PennyStock AI</h1>
        <p className="text-gray-400">Professional Intelligence Platform</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Top 3 Opportunities</h2>
            <div className="space-y-3">
              {top3.map((stock) => (
                <div
                  key={stock.ticker}
                  className="bg-slate-900 border border-purple-500 rounded p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold">{stock.ticker}</h3>
                      <p className="text-gray-400">${stock.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className={stock.change_pct >= 0 ? "text-green-400" : "text-red-400"}>
                        {stock.change_pct >= 0 ? "+" : ""}{stock.change_pct.toFixed(2)}%
                      </p>
                      <p className="text-purple-400 font-bold">Score: {Math.round(stock.score)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">All Stocks</h2>
            <div className="space-y-2">
              {allStocks.map((stock) => (
                <div key={stock.ticker} className="bg-slate-900 rounded p-3 flex justify-between">
                  <span>{stock.ticker}</span>
                  <span className={stock.change_pct >= 0 ? "text-green-400" : "text-red-400"}>
                    {stock.change_pct >= 0 ? "+" : ""}{stock.change_pct.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
