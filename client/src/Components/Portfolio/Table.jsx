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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <div className="w-14 h-14 bg-surface-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <p className="text-text-muted text-base mb-4">
            Please login to view your portfolio.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-6 border border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 py-4 border-b border-border-light last:border-b-0">
              <div className="h-5 bg-surface-tertiary rounded w-24 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-16 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-20 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-20 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (holdings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <p className="text-text-muted text-base">
            No holdings yet. Start trading to build your portfolio!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl overflow-hidden border border-border">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-secondary">
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Symbol</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Quantity</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Avg Buy Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Total Invested</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr
                  key={h._id}
                  className="border-b border-border-light last:border-b-0 hover:bg-surface-secondary transition-colors cursor-pointer"
                  onClick={() => navigate(`/stock/${h.symbol}`)}
                >
                  <td className="px-6 py-4">
                    <span className="text-text-primary font-bold text-sm">{h.symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary font-medium text-sm">{h.quantity}</td>
                  <td className="px-6 py-4 text-text-secondary font-medium text-sm">
                    ${h.avgBuyPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-text-secondary font-medium text-sm">
                    ${h.totalInvested.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stock/${h.symbol}`);
                      }}
                      className="px-4 py-1.5 bg-primary-50 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
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
        <div className="md:hidden flex flex-col divide-y divide-border-light">
          {holdings.map((h) => (
            <div
              key={h._id}
              className="p-4 space-y-2 hover:bg-surface-secondary transition-colors cursor-pointer"
              onClick={() => navigate(`/stock/${h.symbol}`)}
            >
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-xs font-medium">Symbol</span>
                <span className="text-text-primary font-bold text-sm">{h.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-xs font-medium">Quantity</span>
                <span className="text-text-secondary font-medium text-sm">{h.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-xs font-medium">Avg Buy Price</span>
                <span className="text-text-secondary font-medium text-sm">${h.avgBuyPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-xs font-medium">Total Invested</span>
                <span className="text-text-secondary font-medium text-sm">${h.totalInvested.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;