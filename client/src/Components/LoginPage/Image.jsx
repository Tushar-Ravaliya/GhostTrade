import React from "react";

export default function Image() {
  return (
    <div className=" h-full w-full  mx-10 max-w-md">
      <img
        className="aspect-square [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] rounded-b-xl  object-cover rounded-[20px]"
        src="Images/Logo1.jpeg"
      />
    </div>
  );
}

{
  /* <div class="relative w-full max-w-md aspect-square shadow-2xl   mb-30" >
        
        <div class="absolute z-10 inset-y-0 left-0 w-[80%] bg-[#0f1623] rounded-3xl shadow-xl shadow-amber-400 "></div>

        <div class="absolute z-0 inset-y-0 right-0 w-[50%] bg-[#0f1623] rounded-3xl shadow-md shadow-amber-400  origin-bottom skew-x-[-10deg]"></div>

        <div class="absolute inset-0 z-10 p-8 flex flex-col items-center justify-center">
          <h2 class="text-white text-3xl font-bold">
            Ghost<span class="text-green-400">Trade</span>
          </h2>
        </div>
      </div> */
}
