import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import { Clock } from "lucide-react";

const API_BASE = "http://localhost:8000/api/v1";

const History = () => {
  const { isAuthenticated } = useAuthStore();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${API_BASE}/trade/transactions`, {
          withCredentials: true,
        });
        if (data.statusCode === 200) {
          setTransactions(data.data || []);
        }
      } catch {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Transaction History</h1>
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <div className="w-14 h-14 bg-surface-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={24} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-base mb-4">
            Please login to view your transaction history.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Transaction History</h1>
        <div className="bg-white rounded-2xl p-6 border border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 py-4 border-b border-border-light last:border-b-0">
              <div className="h-5 bg-surface-tertiary rounded w-20 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-16 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-16 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-20 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-24 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Transaction History</h1>

      <div className="bg-white rounded-2xl border border-border shadow-sm">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-surface-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-text-muted" />
            </div>
            <p className="text-text-muted text-base">
              No transactions yet. Start trading!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-secondary">
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Type</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Symbol</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Quantity</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Price</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Total</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Balance After</th>
                  <th className="py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => {
                  const isBuy = tx.type === "buy";
                  const date = new Date(tx.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  const time = new Date(tx.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr
                      key={tx._id}
                      className={`${
                        index !== transactions.length - 1
                          ? "border-b border-border-light"
                          : ""
                      } hover:bg-surface-secondary transition-colors duration-200`}
                    >
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                            isBuy
                              ? "bg-primary-50 text-primary"
                              : "bg-danger-light text-danger"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-text-primary text-sm">
                        {tx.symbol}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">{tx.quantity}</td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        ${tx.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`font-semibold text-sm ${
                            isBuy ? "text-danger" : "text-primary"
                          }`}
                        >
                          {isBuy ? "-" : "+"}${tx.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        ${tx.balanceAfter.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-text-secondary text-sm">{date}</div>
                        <div className="text-text-muted text-xs">{time}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;