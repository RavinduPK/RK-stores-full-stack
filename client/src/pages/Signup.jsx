import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/register", form);
      toast.success(res.data.message);
      navigate("/login");
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"
    >
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl flex w-full max-w-4xl overflow-hidden border border-gray-200">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
              className="text-purple-600 hover:underline font-semibold transition"
            >
              Login
            </button>
          </div>
        </div>
        {/* Right: Welcome */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 items-center justify-center flex-col text-white p-10">
          <h2 className="text-6xl font-extrabold mb-6 drop-shadow-lg text-center">
            Welcome to RK Stores!
          </h2>

          <p className="mt-10 text-2xl text-white text-center font-medium ">
            Join us and discover amazing products!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
