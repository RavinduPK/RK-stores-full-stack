import React from "react"
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
// import Navbar from "../components/Navbar" // Uncomment if you use Navbar



const filters = ["All", "Soft Toys", "Educational", "Action Figures", "Outdoor", "Puzzles"]

const toys = [
  {
    name: "Teddy Bear",
    subtitle: "Soft & cuddly plush toy",
    price: "$29",
    img: "https://images.unsplash.com/photo-1627132804266-31cf55bd1eb5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Wooden Blocks",
    subtitle: "Creative educational toy",
    price: "$35",
    img: "https://images.unsplash.com/photo-1549921296-3fdc7c2e6b36?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Toy Car",
    subtitle: "Fun racing car for kids",
    price: "$19",
    img: "https://images.unsplash.com/photo-1616348436160-0b75d2c2b3c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Lego Set",
    subtitle: "Build your imagination",
    price: "$59",
    img: "https://images.unsplash.com/photo-1596464716121-dbe4f7f62a1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Puzzle Game",
    subtitle: "Brain teaser for all ages",
    price: "$25",
    img: "https://images.unsplash.com/photo-1524492449090-1a065f6aecd4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Action Figure",
    subtitle: "Superhero collectible",
    price: "$45",
    img: "https://images.unsplash.com/photo-1606811841683-f017f19a8c30?q=80&w=1200&auto=format&fit=crop",
  },
]

function ToysPage() {
    const navigate = useNavigate(); // Hook to navigate programmatically
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
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-yellow-400/30 to-orange-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-400/30 to-red-400/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 drop-shadow-sm">
          Toys Collection
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Fun, learning & happiness for kids 🎠✨
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search toys..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow hover:shadow-md hover:from-yellow-600 hover:to-orange-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-yellow-200 bg-white/70 hover:bg-yellow-50 hover:border-orange-300 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Toys Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {toys.map((item, i) => (
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
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-orange-600">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow hover:shadow-md hover:from-yellow-600 hover:to-orange-600 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-pink-400/20 blur-2xl"></div>
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
        © 2025 RK Stores — Toys that bring joy 🧸
      </footer>
    </div>
  )
}

export default ToysPage
