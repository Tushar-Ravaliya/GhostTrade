import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/market/quote/${symbol}`
        );
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
    <>
      <div>
        <Header symbol={symbol} stockData={stockData} loading={loading} />
        <div className="h-1/5 px-30 pb-8">
          <TradingViewChart symbol={symbol} />
        </div>
        <KeyDataPoints stockData={stockData} loading={loading} />
        <BuySell symbol={symbol} stockData={stockData} />
      </div>
    </>
  );
};

export default StockDetails;
