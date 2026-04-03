import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart({ symbol = "AAPL" }) {
  const container = useRef();

  useEffect(() => {
    // Clear previous widget when symbol changes
    if (container.current) {
      container.current.innerHTML = '';
    }

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = 'calc(100% - 32px)';
    widgetContainer.style.width = '100%';
    container.current.appendChild(widgetContainer);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="flex flex-col h-[70vh] w-full p-4 bg-white/10 rounded-sm">
      <div
        className="tradingview-widget-container border border-slate-700 rounded-lg overflow-hidden"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      >
      </div>
    </div>
  );
}

export default memo(TradingViewChart);