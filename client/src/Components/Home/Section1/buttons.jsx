import React from "react";

const Buttons = () => {
  return (
    <div className="flex justify-between h-[10vh] py-2 w-screen px-100">
      <button className="bg-none text-white border border-white hover:bg-white/10 px-25 py-3 rounded-md text-2xl font-bold hover:shadow-md hover:shadow-white/50 ">
        Get Started
      </button>
      <button className="bg-none text-white border border-green transition-all ease-linear hover:bg-green/20 hover:shadow-md hover:shadow-green/50 px-25 py-3 rounded-md text-2xl font-bold">
        Get Started
      </button>
    </div>
  );
};

export default Buttons;
