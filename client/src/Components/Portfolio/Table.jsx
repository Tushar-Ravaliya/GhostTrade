import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1";

const Table = () => {
  const { isAuthenticated } = useAuthStore();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          setHoldings(data.data || []);
        }
      } catch {
        setHoldings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="w-full bg-black flex justify-center p-4">
        <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-xl p-12 border border-gray-800 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Please login to view your portfolio.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-black flex justify-center p-4">
        <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-xl p-6 border border-gray-800 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 py-4 border-b border-gray-800 last:border-b-0">
              <div className="h-5 bg-gray-800 rounded w-24" />
              <div className="h-5 bg-gray-800 rounded w-16" />
              <div className="h-5 bg-gray-800 rounded w-20" />
              <div className="h-5 bg-gray-800 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (holdings.length === 0) {
    return (
      <div className="w-full bg-black flex justify-center p-4">
        <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-xl p-12 border border-gray-800 text-center">
          <p className="text-gray-400 text-lg">
            No holdings yet. Start trading to build your portfolio!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black flex justify-center p-4">
      <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse p-1">
            <thead>
              <tr className="border-b border-gray-800 bg-black/50">
                <th className="p-6 text-sm font-bold text-white">Symbol</th>
                <th className="p-6 text-sm font-bold text-white">Quantity</th>
                <th className="p-6 text-sm font-bold text-white">Avg Buy Price</th>
                <th className="p-6 text-sm font-bold text-white">Total Invested</th>
                <th className="p-6 text-sm font-bold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr
                  key={h._id}
                  className="border-b border-gray-800 last:border-b-0 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/stock/${h.symbol}`)}
                >
                  <td className="p-6 text-white font-bold">{h.symbol}</td>
                  <td className="p-6 text-gray-300 font-medium">{h.quantity}</td>
                  <td className="p-6 text-gray-300 font-medium">
                    ${h.avgBuyPrice.toFixed(2)}
                  </td>
                  <td className="p-6 text-gray-300 font-medium">
                    ${h.totalInvested.toFixed(2)}
                  </td>
                  <td className="p-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stock/${h.symbol}`);
                      }}
                      className="px-4 py-1.5 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col divide-y divide-gray-800">
          {holdings.map((h) => (
            <div
              key={h._id}
              className="p-4 space-y-3 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => navigate(`/stock/${h.symbol}`)}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Symbol</span>
                <span className="text-white font-bold">{h.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Quantity</span>
                <span className="text-white font-medium">{h.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Avg Buy Price</span>
                <span className="text-white font-medium">
                  ${h.avgBuyPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Invested</span>
                <span className="text-white font-medium">
                  ${h.totalInvested.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;