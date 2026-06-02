import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import Status from '../Components/Portfolio/Status.jsx';
import Table from '../Components/Portfolio/Table.jsx';

const API_BASE = "http://localhost:8000/api/v1";

export default function Portfolio() {
  const { isAuthenticated } = useAuthStore();
  const [holdings, setHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({}); // { AAPL: { price: 150.2, change: 2.5, percent_change: 1.7 } }
  const [loading, setLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(true);

  // Fetch portfolio holdings
  const fetchPortfolio = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      setPricesLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/trade/portfolio`, {
        withCredentials: true,
      });
      if (data.statusCode === 200) {
        const holdingsData = data.data || [];
        setHoldings(holdingsData);
        // Fetch live prices for each symbol
        if (holdingsData.length > 0) {
          fetchLivePrices(holdingsData);
        } else {
          setPricesLoading(false);
        }
      }
    } catch {
      setHoldings([]);
      setPricesLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch live prices for all holdings in parallel
  const fetchLivePrices = async (holdingsData) => {
    setPricesLoading(true);
    const prices = {};

    await Promise.allSettled(
      holdingsData.map(async (h) => {
        try {
          const { data } = await axios.get(`${API_BASE}/market/quote/${h.symbol}`);
          prices[h.symbol] = {
            price: parseFloat(data.close) || 0,
            change: parseFloat(data.change) || 0,
            percent_change: parseFloat(data.percent_change) || 0,
          };
        } catch {
          prices[h.symbol] = null; // Failed to fetch
        }
      })
    );

    setLivePrices(prices);
    setPricesLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, [isAuthenticated]);

  return (
    <>
      <Status
        holdings={holdings}
        livePrices={livePrices}
        loading={loading}
        pricesLoading={pricesLoading}
      />
      <Table
        holdings={holdings}
        livePrices={livePrices}
        loading={loading}
        pricesLoading={pricesLoading}
        onTradeComplete={fetchPortfolio}
      />
    </>
  );
}