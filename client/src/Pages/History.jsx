import React from 'react';

const History = () => {
  // Mock data based on the provided image
  const historyData = [
    {
      id: 1,
      assetType: 'Equity',
      quantity: 3,
      buyingPrice: 95,
      sellingPrice: 85,
      glValue: -10.08,
      glPercent: -10.61,
      date: '09-02-2026',
    },
    {
      id: 2,
      assetType: 'Equity',
      quantity: 3,
      buyingPrice: 95,
      sellingPrice: 85,
      glValue: 10.08,
      glPercent: -10.61,
      date: '09-02-2026',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white tracking-wide">
        History
      </h1>

      {/* Main Card Container */}
      <div className="bg-[#1c1c1c] rounded-xl p-4 md:p-6 border border-[#2a2a2a] shadow-lg">
        
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg border border-[#262626]">
          <table className="w-full min-w-200 text-left border-collapse">
            
            {/* Table Head */}
            <thead className="bg-black text-white border-b border-[#262626]">
              <tr>
                <th className="py-4 px-6 font-bold w-1/6">Asset Type</th>
                <th className="py-4 px-6 font-bold w-1/6">Quantity</th>
                <th className="py-4 px-6 font-bold w-1/6">Buying Price</th>
                <th className="py-4 px-6 font-bold w-1/6">Selling Price</th>
                <th className="py-4 px-6 font-bold w-1/6">Overall G/L</th>
                <th className="py-4 px-6 font-bold w-1/6">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-black">
              {historyData.map((row, index) => {
                const isLoss = row.glValue < 0;
                
                return (
                  <tr 
                    key={row.id} 
                    className={`
                      ${index !== historyData.length - 1 ? 'border-b border-[#262626]' : ''} 
                      hover:bg-[#0a0a0a] transition-colors duration-200
                    `}
                  >
                    <td className="py-4 px-6 font-medium text-gray-200">{row.assetType}</td>
                    <td className="py-4 px-6 text-gray-200">{row.quantity}</td>
                    <td className="py-4 px-6 text-gray-200">₹ {row.buyingPrice}</td>
                    <td className="py-4 px-6 text-gray-200">₹{row.sellingPrice}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 font-medium">
                        {/* Dynamic color for Gain/Loss Value */}
                        <span className={isLoss ? 'text-red-500' : 'text-green-500'}>
                          {isLoss ? '-' : '+'}₹{Math.abs(row.glValue)}
                        </span>
                        {/* Smaller grey text for Percentage */}
                        <span className="text-xs text-gray-500">
                          {row.glPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-200">{row.date}</td>
                  </tr>
                );
              })}
            </tbody>
            
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;