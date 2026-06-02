import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [logos, setLogos] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketMovers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/market/market-movers"
        );
        const allStocks = [...(data.gainers || []), ...(data.losers || [])];
        setStocks(allStocks);

        allStocks.forEach(async (stock) => {
          try {
            const { data: logoData } = await axios.get(
              `http://localhost:8000/api/v1/market/logo/${stock.symbol}`
            );
            if (logoData.url) {
              setLogos((prev) => ({ ...prev, [stock.symbol]: logoData.url }));
            }
          } catch {
            // Logo not available
          }
        });
      } catch (err) {
        console.error("Failed to fetch market movers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketMovers();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-border animate-shimmer h-44" />
          ))}
        </div>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-text-muted text-lg">No market data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl font-bold text-text-primary mb-6">
        Market Movers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock, index) => {
          const change = parseFloat(stock.percent_change) || 0;
          const isPositive = change > 0;
          const logoUrl = logos[stock.symbol];
          const volume = stock.volume
            ? Number(stock.volume) >= 1e6
              ? `${(Number(stock.volume) / 1e6).toFixed(2)}M`
              : Number(stock.volume).toLocaleString()
            : '---';

          return (
            <div
              key={`${stock.symbol}-${index}`}
              onClick={() => navigate(`/stock/${stock.symbol}`)}
              className={`bg-white rounded-2xl p-5 border border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isPositive
                  ? "hover:border-primary/30 hover:shadow-primary/5"
                  : "hover:border-danger/30 hover:shadow-danger/5"
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-surface-tertiary border border-border">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={stock.symbol}
                      className="w-full h-full object-contain p-1.5"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<span class="${isPositive ? 'text-primary' : 'text-danger'} font-bold text-lg">${stock.symbol?.charAt(0)}</span>`;
                      }}
                    />
                  ) : (
                    <span className={`text-lg font-bold ${isPositive ? "text-primary" : "text-danger"}`}>
                      {stock.symbol?.charAt(0)}
                    </span>
                  )}
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  isPositive
                    ? "bg-primary-50 text-primary"
                    : "bg-danger-light text-danger"
                }`}>
                  {isPositive ? "+" : ""}{change.toFixed(2)}%
                </span>
              </div>

              {/* Company Info */}
              <div className="mb-3">
                <p className="text-text-primary font-bold text-lg">{stock.symbol}</p>
                <p className="text-text-muted text-xs truncate">{stock.name}</p>
              </div>

              {/* Price + Volume */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-text-primary text-xl font-bold">
                    ${parseFloat(stock.close).toFixed(2)}
                  </p>
                  <p className={`text-sm font-medium ${isPositive ? "text-primary" : "text-danger"}`}>
                    {isPositive ? "+" : ""}{change.toFixed(2)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-muted text-[11px] uppercase font-medium">Volume</p>
                  <p className="text-text-secondary text-sm font-semibold">{volume}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stocks;
