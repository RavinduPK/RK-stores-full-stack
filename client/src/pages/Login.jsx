import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-indigo-200",
      "via-purple-200",
      "to-pink-200",
      "min-h-screen"
    );
    return () => {
      document.body.classList.remove(
        "bg-gradient-to-br",
        "from-indigo-200",
        "via-purple-200",
        "to-pink-200",
        "min-h-screen"
      );
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-3xl border-4 border-purple-300">
        {/* Left: Login form */}
        <div className="w-full md:w-2/3 p-10 flex flex-col justify-center bg-gradient-to-br from-white via-purple-50 to-indigo-100">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-500 to-pink-500 mb-8 text-center drop-shadow-lg">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-indigo-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition shadow-sm bg-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="relative">
              <label className="block text-indigo-700 font-semibold mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition shadow-sm bg-white pr-12"
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 cursor-pointer text-purple-500 hover:text-pink-500 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition shadow-lg ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              disabled={loading}
              className="text-purple-600 hover:text-pink-600 font-semibold underline transition"
            >
              Register
            </button>
          </div>
        </div>
        {/* Right: Custom Div */}
        <div className="hidden md:flex w-1/3 bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-500 items-center justify-center p-8 relative">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated text */}
           <p className="text-white text-5xl font-semibold text-center drop-shadow-lg 
   animate-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 
   bg-clip-text text-transparent animate-fadeInUp">
  Login to explore <span className="font-bold">RK Stores</span> 
</p>

          </div>
        </div>
      </div>
      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes textGradientMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-text {
            background-size: 200% 200%;
            animation: textGradientMove 2s linear infinite alternate;
          }
        `}
      </style>
    </div>
  );
}

export default Login;
