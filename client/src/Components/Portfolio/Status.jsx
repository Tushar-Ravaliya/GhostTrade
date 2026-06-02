import React from "react";
import { Tag, BarChart2, TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const Status = ({ holdings = [], livePrices = {}, loading, pricesLoading }) => {
  const { user } = useAuthStore();

  const totalInvested = holdings.reduce((s, h) => s + h.totalInvested, 0);
  const totalShares = holdings.reduce((s, h) => s + h.quantity, 0);

  // Calculate current market value from live prices
  let currentValue = 0;
  let hasAllPrices = true;
  holdings.forEach((h) => {
    const priceData = livePrices[h.symbol];
    if (priceData && priceData.price > 0) {
      currentValue += h.quantity * priceData.price;
    } else {
      hasAllPrices = false;
      currentValue += h.totalInvested; // Fallback to invested amount
    }
  });

  const totalPnL = currentValue - totalInvested;
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  const isPnLPositive = totalPnL >= 0;

  const stats = [
    {
      id: 1,
      label: "Total Holdings",
      value: `${holdings.length}`,
      icon: <Tag className="w-5 h-5 text-primary" />,
      bg: "bg-primary-50",
      subValue: `${totalShares} shares`,
      valueColor: "text-text-primary",
    },
    {
      id: 2,
      label: "Total Invested",
      value: `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <BarChart2 className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
      subValue: null,
      valueColor: "text-text-primary",
    },
    {
      id: 3,
      label: "Current Value",
      value: pricesLoading
        ? "Loading..."
        : `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <DollarSign className="w-5 h-5 text-violet-500" />,
      bg: "bg-violet-50",
      subValue: null,
      valueColor: "text-text-primary",
      isLoading: pricesLoading,
    },
    {
      id: 4,
      label: "Total P&L",
      value: pricesLoading
        ? "Loading..."
        : `${isPnLPositive ? "+" : ""}$${totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: isPnLPositive ? (
        <TrendingUp className="w-5 h-5 text-primary" />
      ) : (
        <TrendingDown className="w-5 h-5 text-danger" />
      ),
      bg: isPnLPositive ? "bg-primary-50" : "bg-danger-light",
      subValue: pricesLoading
        ? null
        : `${isPnLPositive ? "+" : ""}${totalPnLPercent.toFixed(2)}%`,
      valueColor: pricesLoading
        ? "text-text-muted"
        : isPnLPositive
        ? "text-primary"
        : "text-danger",
      subColor: isPnLPositive ? "text-primary" : "text-danger",
      isLoading: pricesLoading,
    },
    {
      id: 5,
      label: "Available Balance",
      value: `$${(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <Wallet className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
      subValue: null,
      valueColor: "text-text-primary",
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="h-8 w-32 bg-surface-tertiary rounded-lg animate-shimmer mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-border animate-shimmer h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-text-muted text-xs font-medium">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  {stat.isLoading ? (
                    <div className="h-5 w-20 bg-surface-tertiary rounded animate-shimmer mt-1" />
                  ) : (
                    <>
                      <span className={`text-base font-bold ${stat.valueColor} truncate`}>
                        {stat.value}
                      </span>
                      {stat.subValue && (
                        <span className={`text-xs font-semibold ${stat.subColor || "text-text-muted"}`}>
                          {stat.subValue}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;