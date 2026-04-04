import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";

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
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white tracking-wide">
          History
        </h1>
        <div className="bg-[#1c1c1c] rounded-xl p-12 border border-[#2a2a2a] text-center">
          <p className="text-gray-400 text-lg mb-4">
            Please login to view your transaction history.
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
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white tracking-wide">
          History
        </h1>
        <div className="bg-[#1c1c1c] rounded-xl p-6 border border-[#2a2a2a] animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-6 py-4 border-b border-[#262626] last:border-b-0"
            >
              <div className="h-5 bg-gray-800 rounded w-20" />
              <div className="h-5 bg-gray-800 rounded w-16" />
              <div className="h-5 bg-gray-800 rounded w-16" />
              <div className="h-5 bg-gray-800 rounded w-20" />
              <div className="h-5 bg-gray-800 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white tracking-wide">
        History
      </h1>

      <div className="bg-[#1c1c1c] rounded-xl p-4 md:p-6 border border-[#2a2a2a] shadow-lg">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No transactions yet. Start trading!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#262626]">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead className="bg-black text-white border-b border-[#262626]">
                <tr>
                  <th className="py-4 px-6 font-bold w-1/7">Type</th>
                  <th className="py-4 px-6 font-bold w-1/7">Symbol</th>
                  <th className="py-4 px-6 font-bold w-1/7">Quantity</th>
                  <th className="py-4 px-6 font-bold w-1/7">Price</th>
                  <th className="py-4 px-6 font-bold w-1/7">Total</th>
                  <th className="py-4 px-6 font-bold w-1/7">Balance After</th>
                  <th className="py-4 px-6 font-bold w-1/7">Date</th>
                </tr>
              </thead>
              <tbody className="bg-black">
                {transactions.map((tx, index) => {
                  const isBuy = tx.type === "buy";
                  const date = new Date(tx.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  );
                  const time = new Date(tx.createdAt).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                  return (
                    <tr
                      key={tx._id}
                      className={`${
                        index !== transactions.length - 1
                          ? "border-b border-[#262626]"
                          : ""
                      } hover:bg-[#0a0a0a] transition-colors duration-200`}
                    >
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            isBuy
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">
                        {tx.symbol}
                      </td>
                      <td className="py-4 px-6 text-gray-200">{tx.quantity}</td>
                      <td className="py-4 px-6 text-gray-200">
                        ${tx.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`font-medium ${
                            isBuy ? "text-red-400" : "text-emerald-400"
                          }`}
                        >
                          {isBuy ? "-" : "+"}${tx.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-200">
                        ${tx.balanceAfter.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        <div>{date}</div>
                        <div className="text-xs text-gray-600">{time}</div>
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