import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
function Twelvedata() {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference for the chart container div
  const chartContainerRef = useRef();

  const fetchStockData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/market/timeseries/${symbol}`);

      if (response.data.status === "error") {
        throw new Error(response.data.message || "Error fetching data");
      }

      // Format data specifically for lightweight-charts
      // Lightweight charts requires { time: 'YYYY-MM-DD', value: number }
      const formattedData = response.data.values.reverse().map((item) => ({
        time: item.datetime,
        value: parseFloat(item.close),
      }));

      setStockData(formattedData);
    } catch (err) {
      setError("Failed to fetch data. Check the symbol or try again later.", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle chart creation and cleanup
  useEffect(() => {
    // Only render the chart if we have data and the ref is attached
    if (stockData.length === 0 || !chartContainerRef.current) return;

    // 1. Initialize the chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      crosshair: {
        mode: 1, // Magnet mode
      },
      timeScale: {
        borderColor: "#cccccc",
      },
    });

    // 2. Create a sleek Area Series (looks like a standard TradingView chart)
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
      lineWidth: 2,
    });

    // 3. Set the data
    areaSeries.setData(stockData);
    chart.timeScale().fitContent();

    // 4. Handle window resizing to keep the chart responsive
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    // 5. Cleanup function to destroy the chart when data changes or component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [stockData]); // Re-run this effect whenever stockData changes

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Stock Market Dashboard</h1>

      <form onSubmit={fetchStockData} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "0.5rem",
            cursor: "pointer",
            background: "#2962FF",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* The div where Lightweight Charts will mount */}
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          position: "relative",
          display: stockData.length > 0 && !loading ? "block" : "none",
        }}
      />
    </div>
  );
}

export default Twelvedata;
