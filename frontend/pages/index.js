export default function Home() {
  const [stocks, setStocks] = require('react').useState([]);
  const [top3, setTop3] = require('react').useState([]);
  const [loading, setLoading] = require('react').useState(true);

  require('react').useEffect(() => {
    fetch('/api/stocks').then(r => r.json()).then(d => {
      setStocks(d.stocks || []);
      setLoading(false);
    });
    fetch('/api/top-3').then(r => r.json()).then(d => {
      setTop3(d.opportunities || []);
    });
  }, []);

  if (loading) {
    return <div style={{padding: '20px', color: 'white'}}>Loading...</div>;
  }

  return (
    <div style={{background: '#0f172a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>🎯 PennyStock AI Advisor</h1>
      <p>Professional Intelligence Platform</p>
      
      <h2 style={{marginTop: '30px'}}>🏆 Top 3 Opportunities</h2>
      {top3.map(s => (
        <div key={s.ticker} style={{background: '#1e293b', border: '1px solid #a855f7', borderRadius: '8px', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <h3>#{s.rank} {s.ticker}</h3>
            <p style={{color: '#999'}}>${s.price.toFixed(2)}</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{color: s.change_pct >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>{s.change_pct >= 0 ? '+' : ''}{s.change_pct.toFixed(2)}%</p>
            <p style={{color: '#a855f7'}}>Score: {Math.round(s.score)}</p>
          </div>
        </div>
      ))}
      
      <h2 style={{marginTop: '30px'}}>📊 All Stocks</h2>
      {stocks.map(s => (
        <div key={s.ticker} style={{background: '#1e293b', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontWeight: 'bold'}}>{s.ticker}</span>
          <span style={{color: s.change_pct >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>{s.change_pct >= 0 ? '+' : ''}{s.change_pct.toFixed(2)}%</span>
          <span style={{color: '#a855f7'}}>{Math.round(s.score)}</span>
        </div>
      ))}
    </div>
  );
}
