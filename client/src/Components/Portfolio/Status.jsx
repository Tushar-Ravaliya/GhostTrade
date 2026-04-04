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
      icon: <Tag className="w-5 h-5 text-white" />,
      valueColor: "text-white",
      subValue: `${totalShares} shares`,
    },
    {
      id: 2,
      label: "Total Invested",
      value: `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <BarChart2 className="w-5 h-5 text-white" />,
      valueColor: "text-white",
      subValue: null,
    },
    {
      id: 3,
      label: "Avg Buy Price",
      value: totalShares > 0 ? `$${(totalInvested / totalShares).toFixed(2)}` : "$0.00",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      valueColor: "text-emerald-400",
      subValue: null,
    },
    {
      id: 4,
      label: "Available Balance",
      value: `$${(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <Wallet className="w-5 h-5 text-white" />,
      valueColor: "text-white",
      subValue: null,
    },
  ];

  if (loading) {
    return (
      <div className="w-full min-h-[200px] bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-2xl p-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-800 rounded w-20 mb-2" />
                  <div className="h-5 bg-gray-800 rounded w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[200px] bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-gray-800">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-4 lg:justify-center lg:first:justify-start lg:pl-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg font-bold ${stat.valueColor}`}>
                    {stat.value}
                  </span>
                  {stat.subValue && (
                    <span className="text-gray-500 text-xs font-medium">
                      {stat.subValue}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;