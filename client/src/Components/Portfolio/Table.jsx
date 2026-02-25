import React from 'react';

const Table = () => {
  const assets = [
    {
      id: 1,
      type: "Equity",
      quantity: 3,
      invested: 95,
      current: 85,
      pl: -10.08,
      plPercent: -10.61
    },
    {
      id: 2,
      type: "Equity",
      quantity: 3,
      invested: 95,
      current: 85,
      pl: -10.08,
      plPercent: -10.61
    }
  ];

  return (
    <div className="w-full bg-black flex justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800">
        
        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse p-1">
            <thead>
              <tr className="border-b border-gray-800 bg-black/50">
                <th className="p-6 text-sm font-bold text-white">Asset Type</th>
                <th className="p-6 text-sm font-bold text-white">Quantity</th>
                <th className="p-6 text-sm font-bold text-white">Invested Amt</th>
                <th className="p-6 text-sm font-bold text-white">Current Value</th>
                <th className="p-6 text-sm font-bold text-white">Overall G/L</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800 last:border-b-0 hover:bg-white/10 transition-colors">
                  <td className="p-6 text-gray-300 font-medium">{asset.type}</td>
                  <td className="p-6 text-gray-300 font-medium">{asset.quantity}</td>
                  <td className="p-6 text-gray-300 font-medium">₹ {asset.invested}</td>
                  <td className="p-6 text-gray-300 font-medium">₹{asset.current}</td>
                  <td className="p-6">
                    <span className="text-red-500 font-medium">
                      -₹{Math.abs(asset.pl).toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      {asset.plPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Visible only on small screens) */}
        <div className="md:hidden flex flex-col divide-y divide-gray-800">
          {assets.map((asset) => (
            <div key={asset.id} className="p-4 space-y-3">
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Asset Type</span>
                <span className="text-white font-medium">{asset.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Quantity</span>
                <span className="text-white font-medium">{asset.quantity}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Invested Amt</span>
                <span className="text-white font-medium">₹ {asset.invested}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Current Value</span>
                <span className="text-white font-medium">₹{asset.current}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Overall G/L</span>
                <div className="text-right">
                  <span className="text-red-500 font-medium mr-2">
                    -₹{Math.abs(asset.pl).toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {asset.plPercent}%
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Table;