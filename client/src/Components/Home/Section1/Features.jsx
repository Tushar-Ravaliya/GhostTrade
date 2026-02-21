import React from "react";

const Features = () => {
  return (
    <div class=" bg-black font-sans">
      <div class="flex items-center justify-center w-28 h-28 mb-3 bg-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-12 h-12 text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
        </svg>
      </div>

      <h3 class="mb-2 text-2xl font-medium tracking-wide text-white">
        Secure Treads
      </h3>

      <p class="text-lg text-gray-400">End-to-end protection</p>
    </div>
  );
};

export default Features;
