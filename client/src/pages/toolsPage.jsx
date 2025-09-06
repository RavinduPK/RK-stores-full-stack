import React from "react"
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

// import Navbar from "../components/Navbar" // Uncomment if you use Navbar

const filters = ["All", "Hand Tools", "Power Tools", "DIY", "Workshop"]

const tools = [
  {
    name: "Hammer",
    subtitle: "Strong steel hammer for DIY",
    price: "$15",
    img: "https://images.unsplash.com/photo-1581093806997-124204d9fa89?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Screwdriver Set",
    subtitle: "Multi-size precision kit",
    price: "$20",
    img: "https://images.unsplash.com/photo-1595278069441-2f9b391d4bdb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cordless Drill",
    subtitle: "Rechargeable with multiple bits",
    price: "$65",
    img: "https://images.unsplash.com/photo-1607860108855-5d43f0e87d75?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Measuring Tape",
    subtitle: "Durable 5m tape measure",
    price: "$8",
    img: "https://images.unsplash.com/photo-1611930022073-3f89b6e22b4c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Wrench Set",
    subtitle: "Complete adjustable set",
    price: "$35",
    img: "https://images.unsplash.com/photo-1633158829571-8f8aeecc65c1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Toolbox",
    subtitle: "Compact box for all essentials",
    price: "$45",
    img: "https://images.unsplash.com/photo-1606379229235-574da5b1c7ef?q=80&w=1200&auto=format&fit=crop",
  },
]

function ToolsPage() {
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
        {/* Background glows */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-gray-400/20 to-slate-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-yellow-400/30 to-orange-400/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-yellow-600 to-orange-600 drop-shadow-sm">
          Tools & Equipment
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Reliable tools for every project 🔧⚙️
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search tools..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-500 text-white shadow hover:shadow-md hover:from-yellow-700 hover:to-orange-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white/70 hover:bg-yellow-50 hover:border-yellow-400 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((item, i) => (
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
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-yellow-600 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-yellow-600">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-yellow-600 to-orange-500 text-white shadow hover:shadow-md hover:from-yellow-700 hover:to-orange-600 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-gray-400/20 blur-2xl"></div>
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
        © 2025 RK Stores — Tools that get the job done ⚡
      </footer>
    </div>
  )
}

export default ToolsPage
