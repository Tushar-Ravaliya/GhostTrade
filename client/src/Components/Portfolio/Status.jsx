import React, { useEffect, useState } from "react";
import { Tag, BarChart2, TrendingUp, Wallet } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1";

const Status = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${API_BASE}/trade/portfolio`, {
          withCredentials: true,
        });
        if (data.statusCode === 200) {
          setPortfolio(data.data || []);
        }
      } catch {
        setPortfolio([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [isAuthenticated]);

  const totalInvested = portfolio.reduce((s, h) => s + h.totalInvested, 0);
  const totalShares = portfolio.reduce((s, h) => s + h.quantity, 0);

  const stats = [
    {
      id: 1,
      label: "Total Holdings",
      value: `${portfolio.length}`,
      icon: <Tag className="w-5 h-5 text-primary" />,
      bg: "bg-primary-50",
      subValue: `${totalShares} shares`,
    },
    {
      id: 2,
      label: "Total Invested",
      value: `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <BarChart2 className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
      subValue: null,
    },
    {
      id: 3,
      label: "Avg Buy Price",
      value: totalShares > 0 ? `$${(totalInvested / totalShares).toFixed(2)}` : "$0.00",
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      bg: "bg-primary-50",
      subValue: null,
    },
    {
      id: 4,
      label: "Available Balance",
      value: `$${(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <Wallet className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
      subValue: null,
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-border animate-shimmer h-28" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-text-muted text-xs font-medium">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-text-primary">{stat.value}</span>
                  {stat.subValue && (
                    <span className="text-text-muted text-xs font-medium">{stat.subValue}</span>
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