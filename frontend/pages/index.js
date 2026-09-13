import { useEffect, useState } from "react";

export default function Dashboard() {
  const [top3, setTop3] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [top3Res, stocksRes] = await Promise.all([
          fetch("/api/top-3"),
          fetch("/api/stocks"),
        ]);

        if (top3Res.ok) setTop3((await top3Res.json()).opportunities || []);
        if (stocksRes.ok) setAllStocks((await stocksRes.json()).stocks || []);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{padding: "20px"}}>Loading...</div>;

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#0f172a", color: "white", padding: "20px"}}>
      <h1>🎯 PennyStock AI</h1>
      <p style={{color: "#999"}}>Professional Intelligence Platform</p>

      <h2 style={{marginTop: "30px"}}>🏆 Top 3 Opportunities</h2>
      {top3.map((stock) => (
        <div key={stock.ticker} style={{
          backgroundColor: "#1e293b",
          border: "1px solid #a855f7",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h3>#{stock.rank} {stock.ticker}</h3>
            <p style={{color: "#999"}}>${stock.price.toFixed(2)}</p>
          </div>
          <div style={{textAlign: "right"}}>
            <p style={{color: stock.change_pct >= 0 ? "#10b981" : "#ef4444", fontWeight: "bold"}}>
              {stock.change_pct >= 0 ? "+" : ""}{stock.change_pct.toFixed(2)}%
            </p>
            <p style={{color: "#a855f7"}}>Score: {Math.round(stock.score)}</p>
          </div>
        </div>
      ))}

      <h2 style={{marginTop: "30px"}}>📊 All Stocks</h2>
      {allStocks.map((stock) => (
        <div key={stock.ticker} style={{
          backgroundColor: "#1e293b",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{fontWeight: "bold"}}>{stock.ticker}</span>
          <span style={{color: stock.change_pct >= 0 ? "#10b981" : "#ef4444", fontWeight: "bold"}}>
            {stock.change_pct >= 0 ? "+" : ""}{stock.change_pct.toFixed(2)}%
          </span>
          <span style={{color: "#a855f7"}}>{Math.round(stock.score)}</span>
        </div>
      ))}

      <footer style={{marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #334155", color: "#666", fontSize: "12px"}}>
        ⚠️ Educational software. Not financial advice.
      </footer>
    </div>
  );
}
