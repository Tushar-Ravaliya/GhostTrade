import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Twelvedata() {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/market/api/stocks/${symbol}`);

      // Twelve Data returns data in descending order (newest first)
      // We reverse it for the chart so time goes left to right
      const formattedData = response.data.values.reverse().map((item) => ({
        date: item.datetime,
        price: parseFloat(item.close),
      }));

      setStockData(formattedData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch stock data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Stock Market Dashboard</h1>

      <form onSubmit={fetchStockData} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem", cursor: "pointer" }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {stockData.length > 0 && !loading && (
        <div style={{ height: "400px", width: "100%", maxWidth: "800px" }}>
          <h3>{symbol} - Last 30 Days (Closing Price)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Twelvedata;
