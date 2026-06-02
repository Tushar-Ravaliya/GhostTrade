import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useToast from "../../store/useToast";
import axios from "axios";
import { TrendingUp, ArrowRight, X, Minus, Plus } from "lucide-react";

const API_BASE = "http://localhost:8000/api/v1";

// ─── Quick Trade Modal ───────────────────────────────────────────────
const QuickTradeModal = ({ holding, livePrice, onClose, onTradeComplete }) => {
  const [tradeType, setTradeType] = useState("sell");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user, fetchUser } = useAuthStore();
  const addToast = useToast((s) => s.addToast);

  const price = livePrice?.price || holding.avgBuyPrice;
  const estimatedTotal = (quantity * price).toFixed(2);

  const handlePreset = (pct) => {
    if (tradeType === "sell") {
      setQuantity(Math.max(1, Math.floor(holding.quantity * (pct / 100))));
    } else {
      // For buy: calculate max shares affordable
      const maxShares = Math.floor((user?.balance || 0) / price);
      setQuantity(Math.max(1, Math.floor(maxShares * (pct / 100))));
    }
  };

  const handleTrade = async () => {
    if (tradeType === "sell" && quantity > holding.quantity) {
      addToast("error", "Insufficient Shares", `You only own ${holding.quantity} share(s).`);
      return;
    }
    if (tradeType === "buy" && user?.balance < parseFloat(estimatedTotal)) {
      addToast("error", "Insufficient Balance", `You have $${user.balance.toFixed(2)} but need $${estimatedTotal}.`);
      return;
    }

    try {
      setLoading(true);
      const endpoint = tradeType === "buy" ? `${API_BASE}/trade/buy` : `${API_BASE}/trade/sell`;
      const { data } = await axios.post(
        endpoint,
        { symbol: holding.symbol, quantity, price },
        { withCredentials: true }
      );

      if (data.statusCode === 200) {
        await fetchUser();
        const updatedBalance = useAuthStore.getState().user?.balance || 0;
        addToast(
          "success",
          `Successfully ${tradeType === "buy" ? "bought" : "sold"} ${quantity} share${quantity > 1 ? "s" : ""} of ${holding.symbol}`,
          `Total: $${estimatedTotal} • Balance: $${updatedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        );
        onClose();
        onTradeComplete();
      }
    } catch (err) {
      addToast("error", "Trade Failed", err.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl border border-border shadow-2xl w-full max-w-sm overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-light">
          <div>
            <h3 className="text-lg font-bold text-text-primary">{holding.symbol}</h3>
            <p className="text-xs text-text-muted">
              Current: ${price.toFixed(2)} • You own: {holding.quantity} shares
            </p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {/* Buy/Sell Toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => { setTradeType("buy"); setQuantity(1); }}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                tradeType === "buy"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-tertiary text-text-muted"
              }`}
            >
              Buy More
            </button>
            <button
              onClick={() => { setTradeType("sell"); setQuantity(1); }}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                tradeType === "sell"
                  ? "bg-danger text-white shadow-sm"
                  : "bg-surface-tertiary text-text-muted"
              }`}
            >
              Sell
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
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 h-10 bg-surface-tertiary border border-border rounded-lg text-center font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-surface-tertiary border border-border rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Presets */}
            <div className="flex gap-2 mt-3">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handlePreset(pct)}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-border text-text-secondary hover:bg-primary-50 hover:text-primary hover:border-primary/30 transition-all"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between py-2 border-t border-border-light">
              <span className="text-sm text-text-muted">Price per share</span>
              <span className="text-sm font-semibold text-text-primary">${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border-light">
              <span className="text-sm text-text-muted">Est. Total</span>
              <span className="text-lg font-bold text-text-primary">${estimatedTotal}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border-light">
              <span className="text-sm text-text-muted">Buying Power</span>
              <span className="text-sm font-semibold text-text-primary">
                ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTrade}
            disabled={loading || (tradeType === "sell" && holding.quantity === 0)}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              tradeType === "buy"
                ? "bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20"
                : "bg-danger hover:bg-danger-dark text-white shadow-md shadow-danger/20"
            }`}
          >
            {loading ? "Processing..." : `${tradeType === "buy" ? "Buy" : "Sell"} ${holding.symbol}`}
          </button>
        </div>
      </div>
    </div>
  );
};


// ─── Empty State with Trending Stocks ────────────────────────────────
const EmptyPortfolio = () => {
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/market/market-movers`);
        setTrendingStocks((data.gainers || []).slice(0, 3));
      } catch {
        setTrendingStocks([]);
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl border border-border p-8 md:p-12 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <TrendingUp size={28} className="text-primary" />
        </div>

        <h2 className="text-xl font-bold text-text-primary mb-2">
          Start Your Trading Journey
        </h2>
        <p className="text-text-muted text-sm mb-8 max-w-md mx-auto">
          Explore trending stocks and make your first trade to build your portfolio.
        </p>

        {/* Trending Stocks Mini Cards */}
        {!loadingTrending && trendingStocks.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 max-w-lg mx-auto">
            {trendingStocks.map((stock) => {
              const change = parseFloat(stock.percent_change).toFixed(2);
              return (
                <Link
                  to={`/stock/${stock.symbol}`}
                  key={stock.symbol}
                  className="flex items-center gap-3 bg-surface-secondary hover:bg-surface-tertiary border border-border-light rounded-xl px-4 py-3 transition-all hover:-translate-y-0.5 flex-1"
                >
                  <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary text-sm font-bold">{stock.symbol.charAt(0)}</span>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold text-text-primary">{stock.symbol}</p>
                    <p className="text-xs text-primary font-semibold">+{change}%</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {loadingTrending && (
          <div className="flex gap-3 justify-center mb-8 max-w-lg mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface-tertiary rounded-xl h-16 flex-1 animate-shimmer" />
            ))}
          </div>
        )}

        <Link
          to="/market"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          Explore Markets
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};


// ─── Main Table Component ────────────────────────────────────────────
const Table = ({ holdings = [], livePrices = {}, loading, pricesLoading, onTradeComplete }) => {
  const navigate = useNavigate();
  const [tradeModal, setTradeModal] = useState(null); // holding object or null

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
              <div className="h-5 bg-surface-tertiary rounded w-20 animate-shimmer" />
              <div className="h-5 bg-surface-tertiary rounded w-16 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (holdings.length === 0) {
    return <EmptyPortfolio />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl overflow-hidden border border-border">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-secondary">
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Symbol</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Qty</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Avg Price</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Invested</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Mkt Price</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">Mkt Value</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide">P&L</th>
                <th className="px-5 py-4 text-xs font-semibold text-text-muted uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const priceData = livePrices[h.symbol];
                const livePrice = priceData?.price || 0;
                const marketValue = livePrice > 0 ? h.quantity * livePrice : 0;
                const pnl = marketValue > 0 ? marketValue - h.totalInvested : 0;
                const pnlPercent = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
                const isPnLPositive = pnl >= 0;

                return (
                  <tr
                    key={h._id}
                    className="border-b border-border-light last:border-b-0 hover:bg-surface-secondary transition-colors cursor-pointer"
                    onClick={() => navigate(`/stock/${h.symbol}`)}
                  >
                    <td className="px-5 py-4">
                      <span className="text-text-primary font-bold text-sm">{h.symbol}</span>
                    </td>
                    <td className="px-5 py-4 text-text-secondary font-medium text-sm">{h.quantity}</td>
                    <td className="px-5 py-4 text-text-secondary font-medium text-sm">
                      ${h.avgBuyPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-text-secondary font-medium text-sm">
                      ${h.totalInvested.toFixed(2)}
                    </td>
                    {/* Live price */}
                    <td className="px-5 py-4">
                      {pricesLoading ? (
                        <div className="h-4 w-16 bg-surface-tertiary rounded animate-shimmer" />
                      ) : livePrice > 0 ? (
                        <span className="text-text-primary font-semibold text-sm">${livePrice.toFixed(2)}</span>
                      ) : (
                        <span className="text-text-muted text-sm">---</span>
                      )}
                    </td>
                    {/* Market value */}
                    <td className="px-5 py-4">
                      {pricesLoading ? (
                        <div className="h-4 w-16 bg-surface-tertiary rounded animate-shimmer" />
                      ) : marketValue > 0 ? (
                        <span className="text-text-primary font-semibold text-sm">
                          ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-text-muted text-sm">---</span>
                      )}
                    </td>
                    {/* P&L */}
                    <td className="px-5 py-4">
                      {pricesLoading ? (
                        <div className="h-4 w-20 bg-surface-tertiary rounded animate-shimmer" />
                      ) : livePrice > 0 ? (
                        <div>
                          <span className={`text-sm font-bold ${isPnLPositive ? "text-primary" : "text-danger"}`}>
                            {isPnLPositive ? "+" : ""}${pnl.toFixed(2)}
                          </span>
                          <span className={`text-xs ml-1 font-semibold ${isPnLPositive ? "text-primary" : "text-danger"}`}>
                            ({isPnLPositive ? "+" : ""}{pnlPercent.toFixed(2)}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-text-muted text-sm">---</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setTradeModal(h)}
                          className="px-3 py-1.5 bg-primary-50 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => setTradeModal(h)}
                          className="px-3 py-1.5 bg-danger-light text-danger text-xs font-bold rounded-lg hover:bg-danger hover:text-white transition-colors"
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden flex flex-col divide-y divide-border-light">
          {holdings.map((h) => {
            const priceData = livePrices[h.symbol];
            const livePrice = priceData?.price || 0;
            const marketValue = livePrice > 0 ? h.quantity * livePrice : 0;
            const pnl = marketValue > 0 ? marketValue - h.totalInvested : 0;
            const pnlPercent = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
            const isPnLPositive = pnl >= 0;

            return (
              <div
                key={h._id}
                className="p-4 space-y-3"
              >
                {/* Symbol + P&L Row */}
                <div className="flex justify-between items-center">
                  <span
                    className="text-text-primary font-bold text-base cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/stock/${h.symbol}`)}
                  >
                    {h.symbol}
                  </span>
                  {pricesLoading ? (
                    <div className="h-5 w-16 bg-surface-tertiary rounded animate-shimmer" />
                  ) : livePrice > 0 ? (
                    <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${
                      isPnLPositive ? "bg-primary-50 text-primary" : "bg-danger-light text-danger"
                    }`}>
                      {isPnLPositive ? "+" : ""}{pnlPercent.toFixed(2)}%
                    </span>
                  ) : null}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Qty</span>
                    <span className="text-text-secondary font-medium text-xs">{h.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Avg Price</span>
                    <span className="text-text-secondary font-medium text-xs">${h.avgBuyPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Invested</span>
                    <span className="text-text-secondary font-medium text-xs">${h.totalInvested.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Mkt Price</span>
                    {pricesLoading ? (
                      <div className="h-3 w-12 bg-surface-tertiary rounded animate-shimmer" />
                    ) : (
                      <span className="text-text-secondary font-medium text-xs">
                        {livePrice > 0 ? `$${livePrice.toFixed(2)}` : "---"}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Mkt Value</span>
                    {pricesLoading ? (
                      <div className="h-3 w-14 bg-surface-tertiary rounded animate-shimmer" />
                    ) : (
                      <span className="text-text-secondary font-medium text-xs">
                        {marketValue > 0 ? `$${marketValue.toFixed(2)}` : "---"}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">P&L</span>
                    {pricesLoading ? (
                      <div className="h-3 w-14 bg-surface-tertiary rounded animate-shimmer" />
                    ) : livePrice > 0 ? (
                      <span className={`font-bold text-xs ${isPnLPositive ? "text-primary" : "text-danger"}`}>
                        {isPnLPositive ? "+" : ""}${pnl.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-text-muted text-xs">---</span>
                    )}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setTradeModal(h)}
                    className="flex-1 py-2 bg-primary-50 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setTradeModal(h)}
                    className="flex-1 py-2 bg-danger-light text-danger text-xs font-bold rounded-lg hover:bg-danger hover:text-white transition-colors"
                  >
                    Sell
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Trade Modal */}
      {tradeModal && (
        <QuickTradeModal
          holding={tradeModal}
          livePrice={livePrices[tradeModal.symbol]}
          onClose={() => setTradeModal(null)}
          onTradeComplete={onTradeComplete}
        />
      )}
    </div>
  );
};

export default Table;