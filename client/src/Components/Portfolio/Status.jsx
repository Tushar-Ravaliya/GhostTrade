import React from 'react'
import { Tag, BarChart2, TrendingUp, Wallet } from 'lucide-react';
const Status = () => {

const stats = [
    {
      id: 1,
      label: "Current Price",
      value: "₹1091",
      icon: <Tag className="w-5 h-5 text-white" />,
      valueColor: "text-white",
      subValue: null
    },
    {
      id: 2,
      label: "Overall Loss",
      value: "₹ 3.39",
      icon: <BarChart2 className="w-5 h-5 text-white" />, // Using BarChart to mimic the down-trend bars
      valueColor: "text-red-500",
      subValue: "-0.31%"
    },
    {
      id: 3,
      label: "Today's Gain",
      value: "₹ 0.00",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      valueColor: "text-green-500",
      subValue: "-0.00%"
    },
    {
      id: 4,
      label: "Total Balance",
      value: "₹ 99,905",
      icon: <Wallet className="w-5 h-5 text-white" />,
      valueColor: "text-white",
      subValue: null
    }
  ];    

  return (
    <div className="w-full  min-h-[200px] bg-black flex items-center justify-center p-4">
      {/* Main Container Bar */}
      <div className="w-full max-w-7xl bg-[#1A1A1A] rounded-2xl p-4 sm:p-6 shadow-lg">
        
        {/* Responsive Grid: 1 col mobile -> 2 col tablet -> 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-gray-800">
          
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-4 lg:justify-center lg:first:justify-start lg:pl-4">
              
              {/* Icon Circle */}
              <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                {stat.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </span>
                
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg font-bold ${stat.valueColor}`}>
                    {stat.value}
                  </span>
                  
                  {/* Optional Percentage Sub-value */}
                  {stat.subValue && (
                    <span className="text-gray-500 text-xs font-medium">
                      {stat.subValue}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Status