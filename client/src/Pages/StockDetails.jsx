import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import TradingViewChart from "../Components/StocksDetails/TradingViewChart";
import Header from "../Components/StocksDetails/Header";
import KeyDataPoints from "../Components/StocksDetails/KeyDataPoints";
import BuySell from "../Components/StocksDetails/BuySell";

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`http://localhost:8000/api/v1/market/quote/${symbol}`);
        setStockData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stock data.");
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStockQuote();
    }
  }, [symbol]);

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link to="/market" className="hover:text-primary transition-colors">
            Stocks
          </Link>
          <span>›</span>
          <span className="text-text-primary font-medium">{symbol}</span>
        </nav>
      </div>

      {/* Header */}
      <Header symbol={symbol} stockData={stockData} loading={loading} />

      {/* Main Content: Chart + Trade Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Chart + Key Data */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <TradingViewChart symbol={symbol} />
            <KeyDataPoints stockData={stockData} loading={loading} />
          </div>

          {/* Right: Trade Panel */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-24">
              <BuySell symbol={symbol} stockData={stockData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
