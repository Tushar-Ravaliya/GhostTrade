import React, {useState} from 'react';

export default function Search() {

  const [title, setTitle] = useState("") 

  const setvalues = (e) =>{
    setTitle(e.target.value
    )
  }

  return (
    <div className="w-full min-h-100 bg-black flex flex-col items-center justify-center p-6 space-y-6 font-sans">
      
      {/* Logo Section */}
      {/* Note: To get the exact distressed look, apply your custom font family class here */}
      <div className="flex items-center gap-3 md:gap-5 text-5xl md:text-7xl tracking-widest uppercase font-frijole">
        <span className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]">
          GHOST
        </span>
        <span className="text-[#009900] drop-shadow-[0_2px_2px_rgba(0,153,0,0.3)]">
          TRADE
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-[#999999] text-sm md:text-lg font-medium tracking-wide pb-4">
        Search the stock that your seeking ..
      </p>

      {/* Search Input Container */}
      <div className="flex items-center w-full max-w-150   bg-white rounded-xl px-4 py-3 md:py-4 transition-shadow focus-within:ring-3 focus-within:ring-green/80">
        
        {/* Search Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-6 h-6 md:w-7 md:h-7 text-black mr-3 shrink-0"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
          />
        </svg>

        {/* Input Field */}
        <input 
          type="text" 
          placeholder="Search.." 
          className="w-full bg-transparent outline-none text-black text-lg md:text-xl placeholder-[#a3a3a3] font-medium"
          onChange={(e)=>{
            setvalues(e)
          }}
          value={title}
        />
      </div>

    </div>
  );
}