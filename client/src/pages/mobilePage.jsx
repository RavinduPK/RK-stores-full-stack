import React from "react"
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

// import Navbar from "../components/Navbar" // Uncomment if using Navbar

const filters = ["All", "Smartphones", "Accessories", "Headphones", "Chargers"]

const mobiles = [
  {
    name: "iPhone 15 Pro",
    subtitle: "128GB · Titanium · A17 Pro chip",
    price: "$999",
    img: "https://images.unsplash.com/photo-1695048137881-b65f5d6a2dff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Samsung Galaxy S23",
    subtitle: "256GB · Snapdragon 8 Gen 2",
    price: "$899",
    img: "https://images.unsplash.com/photo-1610945265070-d91e0f55fd40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Google Pixel 8",
    subtitle: "128GB · AI Camera · Android 14",
    price: "$799",
    img: "https://images.unsplash.com/photo-1707343848635-21b11de58c89?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "OnePlus 11",
    subtitle: "16GB RAM · Hasselblad Camera",
    price: "$699",
    img: "https://images.unsplash.com/photo-1697577411033-9d4d9a02461b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Sony WH-1000XM5",
    subtitle: "Noise Cancelling Headphones",
    price: "$349",
    img: "https://images.unsplash.com/photo-1606227543848-6e162c2510f2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "MagSafe Charger",
    subtitle: "Fast Wireless Charging",
    price: "$59",
    img: "https://images.unsplash.com/photo-1624705002806-3c31c52a4da4?q=80&w=1200&auto=format&fit=crop",
  },
]

function MobilePage() {
    const navigate = useNavigate();
  return (
     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate("/products1")}
          className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition transform duration-300"
        >
          <FaBackward className="text-xl" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-center py-16 px-6">
        {/* Background Glows */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-400/30 to-purple-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-400/30 to-indigo-400/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 drop-shadow-sm">
          Mobiles & Accessories
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Stay connected with the latest smartphones & gadgets 📱✨
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search mobiles..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow hover:shadow-md hover:from-indigo-700 hover:to-purple-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white/70 hover:bg-indigo-50 hover:border-indigo-400 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Mobiles Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mobiles.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-indigo-600">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow hover:shadow-md hover:from-indigo-700 hover:to-purple-600 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="rounded-2xl px-6 py-3 font-semibold bg-white border border-slate-300 shadow hover:shadow-lg">
            Load more
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 text-center text-sm text-slate-500">
        © 2025 RK Stores — Connecting you to the future 🚀
      </footer>
    </div>
  )
}

export default MobilePage
