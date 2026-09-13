export default function handler(req, res) {
  res.status(200).json({
    opportunities: [
      { rank: 1, ticker: "MSTR", price: 198.90, change_pct: 7.2, score: 91 },
      { rank: 2, ticker: "TSLA", price: 245.00, change_pct: 5.1, score: 82 },
      { rank: 3, ticker: "NVDA", price: 425.30, change_pct: 3.8, score: 74 },
    ]
  });
}
