import { useState } from "react";
import Image from "../Components/LoginPage/Image";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Determine if it's an email or mobile number
      const isEmail = formData.identifier.includes("@");
      const loginData = {
        password: formData.password,
        [isEmail ? "email" : "mobileNo"]: formData.identifier,
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.data.statusCode === 200) {
        setUser(response.data.data.user);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url(/Images/background-image.jpeg)] bg-cover bg-center fixed inset-0 blur-sm z-0"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-black/60 backdrop-blur-sm rounded-2xl p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left">
                Login Here
              </h1>
              <p className="text-center lg:text-left">Welcome to paper trading Website</p>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Email or Mobile Number"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Password"
                  required
                />
                <p className="text-sm text-right cursor-pointer">Forgot Password</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-600 transition-colors rounded-2xl w-full px-4 py-2.5 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <div className="flex justify-between">
                <p className="text-xs sm:text-sm">I don't have an Account</p>
                <NavLink
                  to="/register"
                  className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
            <div className="w-full lg:w-1/2 rounded-xl min-h-55 sm:min-h-75 lg:min-h-105 flex items-center justify-center">
              <Image />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
