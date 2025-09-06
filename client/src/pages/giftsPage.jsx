import React from "react"
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar" // Uncomment if you have a Navbar

const filters = ["All", "Birthday", "Anniversary", "Valentine", "Corporate", "Luxury"]

const gifts = [
  {
    name: "Luxury Gift Box",
    subtitle: "Elegant packaging with premium items",
    price: "$129",
    img: "https://images.unsplash.com/photo-1603816245459-1e9a51a140f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Flower & Chocolate Combo",
    subtitle: "Perfect for special occasions",
    price: "$79",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Personalized Mug",
    subtitle: "Custom printed mugs",
    price: "$25",
    img: "https://images.unsplash.com/photo-1581431929390-cf6acdfd6220?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Teddy Bear",
    subtitle: "Soft & cuddly toy gift",
    price: "$45",
    img: "https://images.unsplash.com/photo-1601758124510-52a3c7e2f5b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Corporate Gift Set",
    subtitle: "Premium pens & accessories",
    price: "$99",
    img: "https://images.unsplash.com/photo-1589739906085-2a54ad50a5e6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Valentine Hamper",
    subtitle: "Roses, chocolates & wine",
    price: "$149",
    img: "https://images.unsplash.com/photo-1612200472324-54c38afcb0d7?q=80&w=1200&auto=format&fit=crop",
  },
]

function GiftsPage() {
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
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-500/20 to-rose-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-red-500/20 to-fuchsia-500/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-red-600 to-fuchsia-700 drop-shadow-sm">
          Gifts Collection
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Thoughtful gifts for every occasion 🎁✨
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search gifts..."
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-600 to-red-600 text-white shadow hover:shadow-md hover:from-pink-700 hover:to-red-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-pink-200 bg-white/70 hover:bg-pink-50 hover:border-pink-300 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Gifts Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((item, i) => (
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
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-700 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-pink-700">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white shadow hover:shadow-md hover:from-rose-700 hover:to-fuchsia-700 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 blur-2xl"></div>
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
        © 2025 RK Stores — Gifts that bring smiles 🎀
      </footer>
    </div>
  )
}

export default GiftsPage
