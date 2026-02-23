import React from "react";

const HeroText = () => {
  return (
    <>
      <div className="py-8 my-16 flex flex-col gap-6 text-white uppercase text-center">
        <div className="tracking-widest text-5xl lg:text-6xl leading-tight px-4">
          Trading without physhical <br />{" "}
          <span className="text-green">trace/Real money.</span>{" "}
        </div>
        <div className="text-sm tracking-widest font-normal max-w-2xl mx-auto px-6">
          Connect with collectors worldwide. Buy, sell, and trade authenticated
          banknotes from every era and region with complete security and
          confidence.
        </div>
      </div>
    </>
  );
};

export default HeroText;
