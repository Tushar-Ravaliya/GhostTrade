import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

const API_BASE = "http://localhost:8000/api/v1";

const BuySell = ({ symbol, stockData }) => {
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [holdingQty, setHoldingQty] = useState(0);
  const [holdingAvgPrice, setHoldingAvgPrice] = useState(0);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const { user, isAuthenticated, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  const marketPrice = stockData?.close ? parseFloat(stockData.close) : 0;
  const estimatedTotal = useMemo(
    () => (quantity * marketPrice).toFixed(2),
    [quantity, marketPrice]
  );

  // Fetch user's holding for this symbol
  useEffect(() => {
    const fetchHolding = async () => {
      if (!isAuthenticated) return;
      try {
        const { data } = await axios.get(
          `${API_BASE}/trade/portfolio/${symbol}`,
          { withCredentials: true }
        );
        if (data.statusCode === 200 && data.data) {
          setHoldingQty(data.data.quantity || 0);
          setHoldingAvgPrice(data.data.avgBuyPrice || 0);
        }
      } catch {
        // User may not have any holding yet
        setHoldingQty(0);
        setHoldingAvgPrice(0);
      }
    };
    fetchHolding();
  }, [isAuthenticated, symbol]);

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 4000);
  };

  const handleTrade = async () => {
    if (!isAuthenticated) return;

    // Validate sell quantity
    if (tradeType === "sell" && quantity > holdingQty) {
      setMessage({
        type: "error",
        text: `You only own ${holdingQty} share(s). Cannot sell ${quantity}.`,
      });
      clearMessage();
      return;
    }

    // Validate buy balance
    if (tradeType === "buy" && user?.balance < parseFloat(estimatedTotal)) {
      setMessage({
        type: "error",
        text: `Insufficient balance. You have $${user.balance.toFixed(2)} but need $${estimatedTotal}.`,
      });
      clearMessage();
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const endpoint =
        tradeType === "buy"
          ? `${API_BASE}/trade/buy`
          : `${API_BASE}/trade/sell`;

      const { data } = await axios.post(
        endpoint,
        { symbol, quantity, price: marketPrice },
        { withCredentials: true }
      );

      if (data.statusCode === 200) {
        setMessage({ type: "success", text: data.message });

        // Update local holding state
        if (data.data.portfolio) {
          setHoldingQty(data.data.portfolio.quantity);
          setHoldingAvgPrice(data.data.portfolio.avgBuyPrice);
        }

        // Refresh user to update balance in navbar
        await fetchUser();
        setQuantity(1);
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Trade failed. Please try again.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
      clearMessage();
    }
  };

  return (
    <div className="px-6 md:px-20 py-8">
      <div className="w-full max-w-full mx-auto bg-[#0a0a0a] p-5 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
        {/* Tab Switcher */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setTradeType("buy");
              setMessage(null);
            }}
            className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              tradeType === "buy"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25"
                : "bg-[#1a1a1a] text-gray-500 hover:text-gray-300"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => {
              setTradeType("sell");
              setMessage(null);
            }}
            className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              tradeType === "sell"
                ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25"
                : "bg-[#1a1a1a] text-gray-500 hover:text-gray-300"
            }`}
          >
            Sell
          </button>
        </div>

        {/* Not Logged In Message */}
        {!isAuthenticated && (
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-center">
            <p className="text-amber-300 font-semibold text-lg mb-3">
              🔒 Login Required
            </p>
            <p className="text-gray-400 text-sm mb-4">
              You need to be logged in to buy or sell stocks.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/20"
            >
              Login Now
            </button>
          </div>
        )}

        {/* Holdings Info (if authenticated & has shares for sell tab) */}
        {isAuthenticated && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Your Holdings
              </p>
              <p className="text-white text-xl font-bold">
                {holdingQty}{" "}
                <span className="text-gray-500 text-sm font-normal">
                  shares
                </span>
              </p>
            </div>
            <div className="bg-[#141414] rounded-xl p-4 border border-white/5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Available Balance
              </p>
              <p className="text-white text-xl font-bold">
                ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
              </p>
            </div>
          </div>
        )}

        {/* Market Price Header */}
        <div className="flex justify-between items-center mb-6 bg-[#141414] rounded-xl p-4 border border-white/5">
          <h3 className="text-gray-400 text-base font-medium">Market Price</h3>
          <span className="text-white text-2xl font-bold tracking-tight">
            ${marketPrice.toLocaleString()}
          </span>
        </div>

        {/* Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!isAuthenticated}
                className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded-lg text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                max={tradeType === "sell" ? holdingQty : undefined}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                disabled={!isAuthenticated}
                className="flex-1 bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-center font-bold text-lg focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-30"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!isAuthenticated}
                className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded-lg text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>
            {/* Sell: show max sellable shares hint */}
            {tradeType === "sell" && isAuthenticated && (
              <p className="text-gray-500 text-xs mt-1">
                Max sellable:{" "}
                <button
                  onClick={() => setQuantity(holdingQty)}
                  className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
                >
                  {holdingQty} shares
                </button>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
              Order Type
            </label>
            <div className="bg-[#141414] border border-white/10 rounded-lg p-3 text-gray-400 font-medium flex items-center justify-between">
              <span>Market Order</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                Instant
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-6"></div>

        {/* Financial Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="flex justify-between items-center bg-[#141414] rounded-xl px-4 py-3 border border-white/5">
            <span className="text-gray-400 text-sm font-medium">
              Estimated Total
            </span>
            <span className="text-white text-lg font-bold">
              ${estimatedTotal}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#141414] rounded-xl px-4 py-3 border border-white/5">
            <span className="text-gray-400 text-sm font-medium">Symbol</span>
            <span className="text-white text-lg font-bold">{symbol}</span>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-semibold text-sm transition-all duration-300 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? "✅" : "❌"} {message.text}
          </div>
        )}

        {/* Action Button */}
        {isAuthenticated ? (
          <button
            onClick={handleTrade}
            disabled={
              loading ||
              (tradeType === "sell" && holdingQty === 0) ||
              marketPrice === 0
            }
            className={`w-full py-4 rounded-xl font-extrabold text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              tradeType === "buy"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-400 hover:to-rose-500 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : tradeType === "sell" && holdingQty === 0 ? (
              `No ${symbol} Shares to Sell`
            ) : (
              `Place ${tradeType === "buy" ? "Buy" : "Sell"} Order — ${symbol}`
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 rounded-xl font-extrabold text-lg bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 hover:from-gray-600 hover:to-gray-700 hover:text-white transition-all duration-300"
          >
            Login to Trade
          </button>
        )}
      </div>
    </div>
  );
};

export default BuySell;
