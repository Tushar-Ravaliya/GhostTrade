import React from "react";
import TradingViewChart from "../Components/StocksDetails/TradingViewChart";
import Header from "../Components/StocksDetails/Header";

const StockDetails = () => {
  return (
    <>
      <div>
        <Header />
        <div className="h-1/5 px-30 pb-8">
          <TradingViewChart />
        </div>
      </div>
    </>
  );
};

export default StockDetails;
