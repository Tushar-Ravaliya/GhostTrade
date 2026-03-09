import React from "react";
import TradingViewChart from "../Components/StocksDetails/TradingViewChart";
import Header from "../Components/StocksDetails/Header";
import KeyDataPoints from "../Components/StocksDetails/KeyDataPoints";
import BuySell from "../Components/StocksDetails/BuySell";

const StockDetails = () => {
  return (
    <>
      <div>
        <Header />
        <div className="h-1/5 px-30 pb-8">
          <TradingViewChart />
        </div>
        <KeyDataPoints />
        <BuySell />
      </div>
    </>
  );
};

export default StockDetails;
