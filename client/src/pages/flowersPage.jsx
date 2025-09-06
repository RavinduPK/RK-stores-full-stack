import React from "react"
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

// import Navbar from "../components/Navbar" // uncomment if you have a Navbar

const filters = ["All", "Bouquets", "Indoor Plants", "Outdoor Plants", "Occasion", "Gifts"]

const flowers = [
  {
    name: "Roses Bouquet",
    subtitle: "Romantic & Fresh",
    price: "$29.99",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tulip Arrangement",
    subtitle: "Bright & Cheerful",
    price: "$24.50",
    img: "https://images.unsplash.com/photo-1501004017191-3c5f6e6b3c2e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Orchid Plant",
    subtitle: "Elegant Indoor Plant",
    price: "$39.00",
    img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Sunflower Bouquet",
    subtitle: "Brighten Your Day",
    price: "$19.99",
    img: "https://images.unsplash.com/photo-1501004318640-b39e6451babe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Lavender Plant",
    subtitle: "Calming & Fragrant",
    price: "$15.50",
    img: "https://images.unsplash.com/photo-1501004318642-b39e6451b123?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mixed Flowers",
    subtitle: "Perfect Gift",
    price: "$34.00",
    img: "https://images.unsplash.com/photo-1501004318643-b39e6451abcd?q=80&w=1200&auto=format&fit=crop",
  },
]

function FlowersPage() {
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
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 drop-shadow-sm">
          Flowers & Bouquets
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Brighten your day with beautiful flowers 🌸💐
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search flowers..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:shadow-md hover:from-purple-700 hover:to-pink-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-purple-200 bg-white/70 hover:bg-purple-50 hover:border-purple-300 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Flowers Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {flowers.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow hover:shadow-xl transition"
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-purple-700">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow hover:shadow-md hover:from-indigo-700 hover:to-fuchsia-700 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow on Hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="rounded-2xl px-6 py-3 font-semibold bg-white border border-slate-200 shadow hover:shadow-lg">
            Load more
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 text-center text-sm text-slate-500">
        © 2025 RK Stores — Flowers for every occasion!
      </footer>
    </div>
  )
}

export default FlowersPage
