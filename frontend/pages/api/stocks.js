export default function handler(req, res) {
  res.status(200).json({
    stocks: [
      { ticker: "AAPL", price: 180.50, change_pct: 2.3, score: 68 },
      { ticker: "TSLA", price: 245.00, change_pct: 5.1, score: 82 },
      { ticker: "AMD", price: 135.70, change_pct: -1.2, score: 45 },
      { ticker: "NVDA", price: 425.30, change_pct: 3.8, score: 74 },
      { ticker: "MSTR", price: 198.90, change_pct: 7.2, score: 91 },
    ]
  });
}
