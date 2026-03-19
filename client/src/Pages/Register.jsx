import Image from "../Components/LoginPage/Image";
import { NavLink } from "react-router-dom";
export default function Register() {
  return (
    <>
      <div className="bg-[url(/Images/background-image.jpeg)] bg-cover bg-center fixed inset-0 blur-sm z-0"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-black/60 backdrop-blur-sm rounded-2xl p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left">
                Register Here
              </h1>
              <p className="text-center lg:text-left">Welcome to paper trading Website</p>
              <input
                type="text"
                className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                placeholder="Name"
              />
              <input
                type="text"
                className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                placeholder="Email"
              />
              <input
                type="password"
                className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                placeholder="Password"
              />
              <input
                type="password"
                className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                placeholder="Confirm Password"
              />
              <button className="bg-blue-700 hover:bg-blue-600 transition-colors rounded-2xl w-full px-4 py-2.5">
                Register
              </button>
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm">I have an Account</p>
                <NavLink
                  to="/login"
                  className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign In
                </NavLink>
              </div>
            </div>
            <div
              className="w-full lg:w-1/2 rounded-xl min-h-55 sm:min-h-75 lg:min-h-105 flex items-center justify-center"
              // style={{
              //   transform: "skewX(-10deg)", // Skew creates the slant
              //   left: "-50%", // Adjust position to hide the left-side skew
              // }}
            >
              <Image />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
