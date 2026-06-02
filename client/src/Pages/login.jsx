import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { TrendingUp, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <TrendingUp size={22} className="text-white" />
            </div>
            <span className="text-text-primary font-bold text-2xl">
              Ghost<span className="text-primary">Trade</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-muted text-sm mt-1">Sign in to your trading account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-danger-light border border-danger/20 rounded-xl text-danger text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Email or Mobile Number
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm"
                placeholder="Enter your email or mobile number"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-border rounded-xl px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <p className="text-xs text-primary hover:text-primary-dark cursor-pointer font-medium transition-colors">
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl w-full py-3 transition-all disabled:opacity-50 shadow-sm text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted text-sm">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
