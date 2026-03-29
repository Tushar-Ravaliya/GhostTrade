import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Buttons from "../Components/Home/Section1/buttons";
import Features from "../Components/Home/Section1/Features";
import HeroText from "../Components/Home/Section1/HeroText";
import { Shield, Users, Globe } from "lucide-react";
import ProfitStocks from "../Components/Home/Section2/ProfitStocks";
import LossStocks from "../Components/Home/Section2/LossStocks";

const socket = io("http://localhost:8000");

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
        const [gainerRes, lossRes] = await Promise.all([
          axios.post("http://localhost:8000/api/v1/market/gainer"),
          axios.post("http://localhost:8000/api/v1/market/lower"),
        ]);
        setGainers(gainerRes.data?.data || []);
        setLosers(lossRes.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load market data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  useEffect(() => {
    const handleMarketUpdate = (tick) => {
      const updateList = (prevList) =>
        prevList.map((stock) => {
          // Match the incoming tick to the stock in our list using token
          if (stock.symbolToken === tick.token || stock.token === tick.token) {
            const newLtp = tick.last_traded_price || tick.ltp;
            const newNetChange = tick.net_Change;
            const newPercentChange = tick.percent_Change;

            return {
              ...stock,
              ltp: newLtp ? newLtp / 100 : stock.ltp,
              netChange: newNetChange !== undefined ? newNetChange : stock.netChange,
              percentChange:
                newPercentChange !== undefined ? newPercentChange : stock.percentChange,
            };
          }
          return stock;
        });

      setGainers((prev) => updateList(prev));
      setLosers((prev) => updateList(prev));
    };

    socket.on("market-update", handleMarketUpdate);

    // Clean up listener on unmount / re-render to prevent stacking duplicates
    return () => {
      socket.off("market-update", handleMarketUpdate);
    };
  }, []);
  console.log("Updated Gainers:", gainers);
  // console.log("Updated Losers:", losers);

  const f = [
    {
      icon: <Shield size={80} strokeWidth={3} />,
      text1: "Secure Treads",
      text2: "End-to-end protection",
    },
    {
      icon: <Globe size={80} strokeWidth={3} />,
      text1: "Global Reach",
      text2: "180+ Countries",
    },
    {
      icon: <Users size={80} strokeWidth={3} />,
      text1: "Verified Sellers",
      text2: "Trusted Community",
    },
  ];

  return (
    <div className="text-white">
      <HeroText />
      <Buttons />
      <div className="flex flex-wrap justify-center gap-36 w-full max-w-5xl mx-auto px-8 py-10">
        {f.map((fe, idx) => (
          <div key={idx}>
            <Features icon={fe.icon} text1={fe.text1} text2={fe.text2} />
          </div>
        ))}
      </div>
      <ProfitStocks data={gainers} loading={loading} error={error} />
      <LossStocks data={losers} loading={loading} error={error} />
      {/* <Charts /> */}
    </div>
  );
}
