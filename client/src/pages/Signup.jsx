import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  Shield,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", form);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl flex flex-col xl:flex-row bg-blue-200 backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl overflow-hidden z-10 h-[34rem]">
        {/* Left Side - Signup Form */}
        <div className="w-full xl:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
             
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-slate-500 text-lg">
                Join RK Stores and start your journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <User
                    className={`h-5 w-5 transition-all duration-300 ${
                      focusedField === "name"
                        ? "text-blue-500 transform scale-110"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  required
                  disabled={loading}
                  placeholder="Full Name"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50/80 border-2 rounded-2xl text-slate-700 placeholder-slate-400 transition-all duration-300 hover:bg-white/80 focus:outline-none focus:bg-white/90 ${
                    focusedField === "name"
                      ? "border-blue-400 shadow-lg shadow-blue-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                />
              </div>

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
                  placeholder="Email Address"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50/80 border-2 rounded-2xl text-slate-700 placeholder-slate-400 transition-all duration-300 hover:bg-white/80 focus:outline-none focus:bg-white/90 ${
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
                  placeholder="Password"
                  className={`w-full pl-12 pr-12 py-3 bg-slate-50/80 border-2 rounded-2xl text-slate-700 placeholder-slate-400 transition-all duration-300 hover:bg-white/80 focus:outline-none focus:bg-white/90 ${
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
                className="w-full relative group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98]"
              >
                <span className="flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-slate-500">Already have an account? </span>
              <button
                type="button"
                disabled={loading}
                className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-colors"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Welcome & Features */}
        <div className="hidden xl:flex w-1/2 flex-col justify-center items-center p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 relative overflow-hidden h-[34rem]">
          {/* Logo Section */}
          <div className="relative text-center max-w-md z-10">
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-white to-blue-50/50 rounded-3xl backdrop-blur-sm mb-5 shadow-xl shadow-blue-500/10 border border-white/50">
                <div className="w-17 h-17 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-4xl font-bold text-white">RK</span>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent block ">
                  RK Stores
                </span>
              </h2>

              <p className="text-slate-600 text-lg   leading-relaxed font-medium">
                Discover amazing products, exclusive deals, and a shopping
                experience like no other.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-1">
              <div className="flex items-center text-slate-700 bg-white/50 rounded-2xl p-3 backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-all duration-300">
                <div className="w-10 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/20">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">
                  Exclusive member discounts
                </span>
              </div>

              <div className="flex items-center text-slate-700 bg-white/50 rounded-2xl p-3 backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-all duration-300">
                <div className="w-10 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">Fast & secure checkout</span>
              </div>

              <div className="flex items-center text-slate-700 bg-white/50 rounded-2xl p-3 backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-all duration-300">
                <div className="w-10 h-8 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-indigo-500/20">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">24/7 customer support</span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-4 text-center">
              <p className="text-slate-500 text-sm mb-2">Trusted by</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                10,000+ customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
