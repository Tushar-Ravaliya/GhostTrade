import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TrendingDown, ArrowRight } from 'lucide-react';

export default function LossStocks({ data = [], loading, error }) {
  const [logos, setLogos] = useState({});

  useEffect(() => {
    data.forEach(async (stock) => {
      if (logos[stock.symbol]) return;
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
  }, [data]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-danger-light rounded-lg">
            <TrendingDown size={20} className="text-danger" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary">Top Losers</h2>
        </div>
        <Link
          to="/market"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-border animate-shimmer h-44" />
          ))
        ) : error ? (
          <p className="text-danger text-sm col-span-full">{error}</p>
        ) : data.length > 0 ? (
          data.map((stock) => {
            const logoUrl = logos[stock.symbol];
            const change = Number(stock.percent_change).toFixed(2);
            const volume = stock.volume
              ? Number(stock.volume) >= 1e6
                ? `${(Number(stock.volume) / 1e6).toFixed(2)}M`
                : Number(stock.volume).toLocaleString()
              : '---';

            return (
              <Link
                to={`/stock/${stock.symbol}`}
                key={stock.symbol}
                className="group"
              >
                <div className="bg-white rounded-2xl p-5 border border-border hover:border-danger/30 hover:shadow-lg hover:shadow-danger/5 transition-all duration-300 hover:-translate-y-1">
                  {/* Top Row: Logo + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-surface-tertiary border border-border">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={stock.symbol}
                          className="w-full h-full object-contain p-1.5"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `<span class="text-danger font-bold text-lg">${stock.symbol.charAt(0)}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-danger font-bold text-lg">{stock.symbol.charAt(0)}</span>
                      )}
                    </div>
                    <span className="px-2.5 py-1 bg-danger-light text-danger text-xs font-bold rounded-full">
                      {change}%
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
                        ${Number(stock.close).toFixed(2)}
                      </p>
                      <p className="text-danger text-sm font-medium">
                        {change}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-muted text-[11px] uppercase font-medium">Volume</p>
                      <p className="text-text-secondary text-sm font-semibold">{volume}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-text-muted col-span-full text-center py-8">No losers data available</p>
        )}
      </div>
    </section>
  );
}
