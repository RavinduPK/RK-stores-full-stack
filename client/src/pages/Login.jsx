import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/cart2.jpg";


import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3001/login", { email, password });
    localStorage.setItem("token", res.data.token); // ✅ store token
    navigate("/dashboard"); // redirect to dashboard after login
  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/login", form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", form.email);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
   <div
  className="min-h-screen w-full flex items-center justify-center relative bg-no-repeat bg-center"
  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '100%' }}
>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Card Container */}
      <div className="relative w-2xl  flex flex-col md:flex-row backdrop-blur-sm border rounded-3xl shadow-2xl overflow-hidden z-10">
      

        {/* Right Side - Login Form */}
        <div className="w-full md:w-6/3 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
            
              <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent mb-2">
                Sign In
              </h1>
              <p className="text-white">Welcome back! Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail
                    className={`h-5 w-5 transition-all duration-300 ${
                      focusedField === "email"
                        ? "text-blue-500 transform scale-110"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50/80 border-2 rounded-2xl text-black-00 placeholder-slate-400 transition-all duration-300 hover:bg-white/80 focus:outline-none focus:bg-white/90 ${
                    focusedField === "email"
                      ? "border-blue-400 shadow-lg shadow-blue-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock
                    className={`h-5 w-5 transition-all duration-300 ${
                      focusedField === "password"
                        ? "text-blue-500 transform scale-110"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50/80 border-2 rounded-2xl text-slate-700 placeholder-slate-400 transition-all duration-300 hover:bg-white/80 focus:outline-none focus:bg-white/90 ${
                    focusedField === "password"
                      ? "border-blue-400 shadow-lg shadow-blue-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98]"
              >
                <span className="flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-white">Don't have an account? </span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
                className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
