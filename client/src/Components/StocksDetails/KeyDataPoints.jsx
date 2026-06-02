import React from "react";

const KeyDataPoints = ({ stockData, loading }) => {
  const data = [
    { label: "Volume", value: stockData?.volume ? Number(stockData.volume).toLocaleString() : "---" },
    { label: "Previous Close", value: stockData?.previous_close ? `$${Number(stockData.previous_close).toFixed(2)}` : "---" },
    { label: "Open", value: stockData?.open ? `$${Number(stockData.open).toFixed(2)}` : "---" },
    { label: "Day's Range", value: stockData?.low && stockData?.high ? `$${Number(stockData.low).toFixed(2)} — $${Number(stockData.high).toFixed(2)}` : "---" },
    { label: "52 Week High", value: stockData?.fifty_two_week?.high ? `$${Number(stockData.fifty_two_week.high).toFixed(2)}` : "---" },
    { label: "52 Week Low", value: stockData?.fifty_two_week?.low ? `$${Number(stockData.fifty_two_week.low).toFixed(2)}` : "---" },
  ];

  // Calculate 52-week range position
  const fiftyTwoHigh = stockData?.fifty_two_week?.high ? Number(stockData.fifty_two_week.high) : null;
  const fiftyTwoLow = stockData?.fifty_two_week?.low ? Number(stockData.fifty_two_week.low) : null;
  const currentPrice = stockData?.close ? Number(stockData.close) : null;
  let rangePercent = 50;
  if (fiftyTwoHigh && fiftyTwoLow && currentPrice && fiftyTwoHigh !== fiftyTwoLow) {
    rangePercent = ((currentPrice - fiftyTwoLow) / (fiftyTwoHigh - fiftyTwoLow)) * 100;
    rangePercent = Math.min(100, Math.max(0, rangePercent));
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
      <h2 className="text-lg font-bold text-text-primary mb-5">Key Statistics</h2>

      {/* 52-Week Range Visual */}
      {fiftyTwoLow && fiftyTwoHigh && (
        <div className="mb-6 p-4 bg-surface-secondary rounded-xl">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">52 Week Range</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-text-secondary">${fiftyTwoLow?.toFixed(2)}</span>
            <div className="flex-1 relative h-2 bg-surface-tertiary rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-danger via-yellow-400 to-primary rounded-full transition-all duration-500"
                style={{ width: `${rangePercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full shadow-md transition-all duration-500"
                style={{ left: `calc(${rangePercent}% - 7px)` }}
              />
            </div>
            <span className="text-xs font-semibold text-text-secondary">${fiftyTwoHigh?.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Data Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2.5 border-b border-border-light last:border-b-0"
          >
            <span className="text-sm text-text-muted font-medium">{item.label}</span>
            {loading ? (
              <div className="h-4 w-20 bg-surface-tertiary rounded animate-shimmer" />
            ) : (
              <span className="text-sm font-semibold text-text-primary">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyDataPoints;
