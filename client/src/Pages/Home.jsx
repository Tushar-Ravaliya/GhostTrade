import { useEffect, useState } from "react";
import axios from "axios";
import HeroText from "../Components/Home/Section1/HeroText";
import ProfitStocks from "../Components/Home/Section2/ProfitStocks";
import LossStocks from "../Components/Home/Section2/LossStocks";

export default function Home() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("http://localhost:8000/api/v1/market/market-movers");
        setGainers(data.gainers || []);
        setLosers(data.losers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load market data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  return (
    <div>
      <HeroText />
      <ProfitStocks data={gainers} loading={loading} error={error} />
      <LossStocks data={losers} loading={loading} error={error} />
    </div>
  );
}
