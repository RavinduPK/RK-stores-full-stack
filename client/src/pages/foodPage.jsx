import React from "react"
import Navbar from "../components/Navbar";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const filters = ["All", "Fast Food", "Snacks", "Healthy", "Desserts", "Drinks"]

const foods = [
  {
    name: "Cheese Burger",
    subtitle: "Fast Food",
    price: "$5.99",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Pizza Slice",
    subtitle: "Fast Food",
    price: "$3.50",
    img: "https://images.unsplash.com/photo-1548365328-9d89f85a56c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Fruit Bowl",
    subtitle: "Healthy",
    price: "$4.25",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Chocolate Cake",
    subtitle: "Dessert",
    price: "$6.50",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ice Cream Cone",
    subtitle: "Dessert",
    price: "$2.75",
    img: "https://images.unsplash.com/photo-1508739826987-b79cd8b7da12?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Fresh Juice",
    subtitle: "Drinks",
    price: "$3.20",
    img: "https://images.unsplash.com/photo-1577801596755-d6fdcfc5965f?q=80&w=1200&auto=format&fit=crop",
  },
]

function FoodsPage() {
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
      {/* Hero */}
      <section className="relative overflow-hidden text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 drop-shadow-sm">
          🍔 Delicious Foods Collection 🍕
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-700">
          Tasty, fresh, and irresistible meals for every mood 😋
        </p>

        {/* Search */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search food, snacks, or drinks…"
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 text-white shadow hover:shadow-md hover:from-red-700 hover:to-orange-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium border border-orange-200 bg-white/70 hover:bg-orange-50 hover:border-orange-300 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Foods Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((item, i) => (
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
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-600 transition">
                  {item.name}
                </h3>
                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-red-600">{item.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white shadow hover:shadow-md hover:from-red-600 hover:to-orange-600 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="rounded-2xl px-6 py-3 font-semibold bg-white border border-slate-200 shadow hover:shadow-lg">
            Load more
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 text-center text-sm text-slate-600">
        © 2025 RK Stores — Eat fresh, eat happy 🍽️
      </footer>
    </div>
  )
}

export default FoodsPage
