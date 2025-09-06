import React from "react"
import { FaBackward } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
// import Navbar from "../components/Navbar" // Uncomment if you use Navbar

const filters = ["All", "Cookware", "Appliances", "Cutlery", "Storage"]

const kitchenItems = [
  {
    name: "Non-Stick Frying Pan",
    subtitle: "Premium Ceramic Coating · 28cm",
    price: "$45",
    img: "https://images.unsplash.com/photo-1607619056574-7b8d5b016d5a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Blender Pro",
    subtitle: "High Speed · 1500W Motor",
    price: "$129",
    img: "https://images.unsplash.com/photo-1617196036515-bbc58fa1f0a4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Chef’s Knife Set",
    subtitle: "Stainless Steel · 6 Pieces",
    price: "$89",
    img: "https://images.unsplash.com/photo-1623689047933-50e54f9b89e0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Air Fryer XL",
    subtitle: "5L · Oil-Free Healthy Cooking",
    price: "$159",
    img: "https://images.unsplash.com/photo-1622206113406-661c7a509a68?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Glass Storage Jars",
    subtitle: "Airtight · Set of 6",
    price: "$35",
    img: "https://images.unsplash.com/photo-1622206142815-3297d482ca2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Coffee Maker",
    subtitle: "Programmable · 12 Cups",
    price: "$99",
    img: "https://images.unsplash.com/photo-1617191518005-8a3b56131f2c?q=80&w=1200&auto=format&fit=crop",
  },
]

function KitchenPage() {
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
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-400/30 to-yellow-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-400/30 to-orange-400/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-500 to-yellow-600 drop-shadow-sm">
          Kitchen Essentials
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Cook smarter with the best cookware, appliances & tools 🍳✨
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search kitchen items..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow hover:shadow-md hover:from-orange-600 hover:to-pink-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white/70 hover:bg-orange-50 hover:border-orange-400 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Kitchen Items Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {kitchenItems.map((item, i) => (
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
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-orange-600">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow hover:shadow-md hover:from-orange-600 hover:to-pink-600 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-yellow-400/20 blur-2xl"></div>
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
        © 2025 RK Stores — Making kitchens smarter 🍴
      </footer>
    </div>
  )
}

export default KitchenPage
