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
      "theme": "light",
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
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "480px", width: "100%" }}
      >
      </div>
    </div>
  );
}

export default memo(TradingViewChart);