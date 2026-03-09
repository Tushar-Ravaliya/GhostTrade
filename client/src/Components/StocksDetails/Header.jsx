import React from 'react';

const Header = () => {
  return (
    <div className="w-full bg-black flex items-center p-4 md:p-15 md:px-30 min-h-30">
      <div className="flex items-center space-x-4 md:space-x-6">
        
        {/* Logo Circle */}
        <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-4xl md:text-5xl font-black">K</span>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center leading-tight">
          {/* Title */}
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wider uppercase">
            KALIYANJIT
          </h1>
          
          {/* Price and Change Container */}
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-white text-2xl md:text-3xl font-semibold">
              6,973.95
            </span>
            
            <span className="text-[10px] md:text-xs text-gray-400 uppercase font-medium">
              inr
            </span>

            <span className="text-red-500 text-sm md:text-[15px] font-medium">
              -0.04%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;