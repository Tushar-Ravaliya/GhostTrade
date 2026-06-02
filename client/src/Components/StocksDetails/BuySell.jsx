import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { Lock, ShieldCheck, Minus, Plus } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-border">
        <button className="flex-1 py-3 text-sm font-semibold text-primary border-b-2 border-primary bg-primary-50/30">
          Trade
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-text-muted hover:text-text-secondary transition-colors" disabled>
          Alerts
        </button>
      </div>

      <div className="p-5">
        {/* Buy/Sell Toggle */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => { setTradeType("buy"); setMessage(null); }}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              tradeType === "buy"
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-tertiary text-text-muted hover:text-text-secondary"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => { setTradeType("sell"); setMessage(null); }}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              tradeType === "sell"
                ? "bg-danger text-white shadow-sm"
                : "bg-surface-tertiary text-text-muted hover:text-text-secondary"
            }`}
          >
            Sell
          </button>
        </div>

        {/* Not Logged In */}
        {!isAuthenticated && (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-surface-tertiary rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={20} className="text-text-muted" />
            </div>
            <p className="text-text-primary font-semibold mb-1">Login Required</p>
            <p className="text-text-muted text-sm mb-4">
              You need to be logged in to trade stocks.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Login to Trade
            </button>
          </div>
        )}

        {isAuthenticated && (
          <>
            {/* Order Type */}
            <div className="flex gap-1.5 mb-5 bg-surface-tertiary rounded-lg p-1">
              <button className="flex-1 py-2 rounded-md text-xs font-semibold bg-white text-text-primary shadow-sm">
                Market
              </button>
              <button className="flex-1 py-2 rounded-md text-xs font-medium text-text-muted" disabled>
                Limit
              </button>
              <button className="flex-1 py-2 rounded-md text-xs font-medium text-text-muted" disabled>
                Stop
              </button>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-surface-tertiary border border-border rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={tradeType === "sell" ? holdingQty : undefined}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="flex-1 h-10 bg-surface-tertiary border border-border rounded-lg text-center font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-surface-tertiary border border-border rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors"
                >
                  <Plus size={16} />
                </button>
                <div className="h-10 px-3 bg-surface-tertiary border border-border rounded-lg flex items-center">
                  <span className="text-xs font-medium text-text-muted">Shares</span>
                </div>
              </div>
              {/* Sell: show max sellable shares hint */}
              {tradeType === "sell" && (
                <p className="text-text-muted text-xs mt-1.5">
                  Max sellable:{" "}
                  <button
                    onClick={() => setQuantity(holdingQty)}
                    className="text-primary hover:text-primary-dark font-semibold underline transition-colors"
                  >
                    {holdingQty} shares
                  </button>
                </p>
              )}
            </div>

            {/* Estimated Amount */}
            <div className="flex items-center justify-between py-3 border-t border-border-light">
              <span className="text-sm text-text-muted">Est. Amount</span>
              <span className="text-lg font-bold text-text-primary">${estimatedTotal}</span>
            </div>

            {/* Holdings & Balance Info */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-muted">Your Holdings</span>
                <span className="text-sm font-semibold text-text-primary">{holdingQty} shares</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border-light">
                <span className="text-sm text-text-muted">Buying Power</span>
                <span className="text-sm font-semibold text-text-primary">
                  ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                </span>
              </div>
            </div>

            {/* Message Alert */}
            {message && (
              <div
                className={`mb-4 p-3 rounded-xl text-center font-medium text-sm transition-all duration-300 ${
                  message.type === "success"
                    ? "bg-primary-50 border border-primary/20 text-primary-dark"
                    : "bg-danger-light border border-danger/20 text-danger-dark"
                }`}
              >
                {message.type === "success" ? "✓" : "✕"} {message.text}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleTrade}
              disabled={
                loading ||
                (tradeType === "sell" && holdingQty === 0) ||
                marketPrice === 0
              }
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                tradeType === "buy"
                  ? "bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  : "bg-white border-2 border-danger text-danger hover:bg-danger hover:text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : tradeType === "sell" && holdingQty === 0 ? (
                `No ${symbol} Shares to Sell`
              ) : (
                `${tradeType === "buy" ? "Buy" : "Sell"} ${symbol}`
              )}
            </button>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-1.5 mt-4 text-text-muted">
              <ShieldCheck size={14} />
              <span className="text-xs font-medium">Secure & Encrypted</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuySell;
