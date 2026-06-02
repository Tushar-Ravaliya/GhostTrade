import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = ({ symbol, stockData, loading }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  const name = stockData?.name || symbol || '---';
  const exchange = stockData?.exchange || '---';
  const price = stockData?.close ? Number(stockData.close) : 0;
  const change = parseFloat(stockData?.change || 0);
  const percentChange = parseFloat(stockData?.percent_change || 0);
  const isPositive = percentChange >= 0;

  useEffect(() => {
    const fetchLogo = async () => {
      if (!symbol) return;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/market/logo/${symbol}`
        );
        if (data.url) {
          setLogoUrl(data.url);
        }
      } catch {
        // Logo not available
      }
    };
    fetchLogo();
  }, [symbol]);

  const quickStats = [
    { label: 'Open', value: stockData?.open ? Number(stockData.open).toFixed(2) : '---' },
    { label: 'High', value: stockData?.high ? Number(stockData.high).toFixed(2) : '---', highlight: isPositive ? 'text-primary' : '' },
    { label: 'Low', value: stockData?.low ? Number(stockData.low).toFixed(2) : '---', highlight: !isPositive ? 'text-danger' : '' },
    { label: 'Prev Close', value: stockData?.previous_close ? Number(stockData.previous_close).toFixed(2) : '---' },
    { label: 'Volume', value: stockData?.volume ? Number(stockData.volume) >= 1e6 ? `${(Number(stockData.volume) / 1e6).toFixed(2)}M` : Number(stockData.volume).toLocaleString() : '---' },
    { label: 'Avg. Volume', value: stockData?.average_volume ? Number(stockData.average_volume) >= 1e6 ? `${(Number(stockData.average_volume) / 1e6).toFixed(2)}M` : Number(stockData.average_volume).toLocaleString() : '---' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 bg-surface-tertiary border border-border">
              {loading ? (
                <div className="w-full h-full animate-shimmer" />
              ) : logoUrl ? (
                <img
                  src={logoUrl}
                  alt={symbol}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-primary font-bold text-2xl">${symbol ? symbol.charAt(0) : '?'}</span>`;
                  }}
                />
              ) : (
                <span className="text-primary font-bold text-2xl">{symbol ? symbol.charAt(0) : '?'}</span>
              )}
            </div>

            {/* Name + Tags */}
            <div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-surface-tertiary rounded animate-shimmer" />
                  <div className="h-4 w-32 bg-surface-tertiary rounded animate-shimmer" />
                </div>
              ) : (
                <>
                  <h1 className="text-xl md:text-2xl font-bold text-text-primary">{name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">{symbol}</span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs font-medium text-text-muted">{exchange}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Share button placeholder */}
          <button className="hidden md:flex items-center gap-2 text-sm text-text-muted hover:text-text-primary border border-border rounded-lg px-4 py-2 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          {loading ? (
            <div className="space-y-2">
              <div className="h-10 w-40 bg-surface-tertiary rounded animate-shimmer" />
              <div className="h-4 w-48 bg-surface-tertiary rounded animate-shimmer" />
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-text-primary">
                  ${price.toFixed(2)}
                </span>
                <span className={`text-base font-semibold ${isPositive ? 'text-primary' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
                </span>
              </div>
              <p className="text-text-muted text-xs mt-1">
                Market {stockData?.is_market_open ? 'Open' : 'Closed'} • {stockData?.datetime || '---'}
              </p>
            </>
          )}
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickStats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="text-[11px] text-text-muted uppercase tracking-wide font-medium">{stat.label}</p>
              {loading ? (
                <div className="h-5 w-16 bg-surface-tertiary rounded animate-shimmer mt-1 mx-auto sm:mx-0" />
              ) : (
                <p className={`text-sm font-semibold mt-0.5 ${stat.highlight || 'text-text-primary'}`}>
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;