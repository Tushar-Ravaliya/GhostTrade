import React from "react";

const Features = (props) => {
  console.log(props);
  
  return (
    <div className="bg-black font-sans flex flex-col items-center">
      <div className="flex items-center justify-center w-28 h-28 mb-3 bg-white text-black rounded-full">
        {props.icon}
      </div>

      <h3 className="mb-2 text-2xl font-medium tracking-wide text-white">
        {props.text1}
      </h3>

      <p className="text-lg text-gray-400">{props.text2}</p>
    </div>
  );
};

export default Features;
