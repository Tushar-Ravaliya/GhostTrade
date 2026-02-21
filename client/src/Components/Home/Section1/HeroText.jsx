import React from "react";

const HeroText = () => {
  return (
    <>
      <div className="h-[35vh] py-2 my-20 justify-between flex flex-col text-white uppercase text-center ">
        <div className="tracking-widest text-6xl font-bold ">
          Trading without physhical <br />{" "}
          <span className="text-green">trace/Real money.</span>{" "}
        </div>
        <div className="text-sm tracking-widest font-normal px-80">
          Connect with collectors worldwide. Buy, sell, and trade authenticated
          banknotes from every era and region with complete security and
          confidence.
        </div>
      </div>
    </>
  );
};

export default HeroText;
