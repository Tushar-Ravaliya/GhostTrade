import React from "react";

const Buttons = () => {
  return (
    <div className="flex justify-center gap-8 py-6 w-full px-6">
      <button className="bg-none text-white border border-white hover:bg-white/10 px-10 py-3 rounded-md text-xl font-bold hover:shadow-md hover:shadow-white/50 transition-all ease-linear">
        Get Started
      </button>
      <button className="bg-none text-white border border-green transition-all ease-linear hover:bg-green/20 hover:shadow-md hover:shadow-green/50 px-10 py-3 rounded-md text-xl font-bold">
        Learn More
      </button>
    </div>
  );
};

export default Buttons;
