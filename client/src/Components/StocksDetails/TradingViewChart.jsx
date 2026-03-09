import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT", // You can make this dynamic via props
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark", // Or "light"
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      });
      container.current.appendChild(script);
    },
    []
  );

  return (
    // Tailwind classes used for layout and height
    <div className="flex flex-col h-screen w-full p-4 bg-slate-900">
      <div 
        className="tradingview-widget-container border border-slate-700 rounded-lg overflow-hidden" 
        ref={container} 
        style={{ height: "100%", width: "100%" }}
      >
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      </div>
    </div>
  );
}

export default memo(TradingViewChart);