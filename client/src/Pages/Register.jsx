import { useState } from "react";
import Image from "../Components/LoginPage/Image";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        registerData,
        {
          withCredentials: true,
        }
      );

      if (response.data.statusCode === 201) {
        console.log("Registration successful:", response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "An error occurred during registration");
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
                Register Here
              </h1>
              <p className="text-center lg:text-left">Welcome to paper trading Website</p>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Mobile Number"
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
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-800 border border-white w-full rounded-lg px-3 py-3"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-600 transition-colors rounded-2xl w-full px-4 py-2.5 disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
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
            <div className="w-full lg:w-1/2 rounded-xl min-h-55 sm:min-h-75 lg:min-h-105 flex items-center justify-center">
              <Image />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
