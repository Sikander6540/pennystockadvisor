export default function Home() {
  return (
    <div style={{backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '20px'}}>
      <h1>🎯 PennyStock AI Advisor</h1>
      <p>Professional Intelligence Platform</p>
      
      <h2 style={{marginTop: '30px'}}>🏆 Top 3</h2>
      <div style={{backgroundColor: '#1e293b', padding: '15px', margin: '10px 0', borderRadius: '8px'}}>
        <h3>#1 MSTR - $198.90</h3>
        <p style={{color: '#10b981'}}>+7.2% | Score: 91</p>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '15px', margin: '10px 0', borderRadius: '8px'}}>
        <h3>#2 TSLA - $245.00</h3>
        <p style={{color: '#10b981'}}>+5.1% | Score: 82</p>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '15px', margin: '10px 0', borderRadius: '8px'}}>
        <h3>#3 NVDA - $425.30</h3>
        <p style={{color: '#10b981'}}>+3.8% | Score: 74</p>
      </div>

      <h2 style={{marginTop: '30px'}}>📊 All Stocks</h2>
      <div style={{backgroundColor: '#1e293b', padding: '10px', margin: '5px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
        <span>AAPL</span> <span style={{color: '#10b981'}}>+2.3%</span> <span>68</span>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '10px', margin: '5px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
        <span>TSLA</span> <span style={{color: '#10b981'}}>+5.1%</span> <span>82</span>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '10px', margin: '5px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
        <span>AMD</span> <span style={{color: '#ef4444'}}>-1.2%</span> <span>45</span>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '10px', margin: '5px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
        <span>NVDA</span> <span style={{color: '#10b981'}}>+3.8%</span> <span>74</span>
      </div>
      <div style={{backgroundColor: '#1e293b', padding: '10px', margin: '5px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'}}>
        <span>MSTR</span> <span style={{color: '#10b981'}}>+7.2%</span> <span>91</span>
      </div>
    </div>
  );
}
