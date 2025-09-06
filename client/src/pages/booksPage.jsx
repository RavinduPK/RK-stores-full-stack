import React from "react"
import { FaBackward } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const filters = ["All", "Best Sellers", "New Arrivals", "Fiction", "Non-Fiction", "Kids", "Sci-Fi", "Self-Help"]

const books = [
  {
    name: "The Silent Library",
    subtitle: "by Ava Sinclair",
    price: "$14.99",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Orbit of Dreams",
    subtitle: "by Kai Mercer",
    price: "$18.50",
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Ink & Ember",
    subtitle: "by Mara Quinn",
    price: "$12.00",
    img: "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Beyond the Vale",
    subtitle: "by Rowan Hale",
    price: "$16.75",
    img: "https://images.unsplash.com/photo-1528208079124-0f456cadb804?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "The Paper Seas",
    subtitle: "by Elio Hart",
    price: "$11.99",
    img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Starlit Chapters",
    subtitle: "by Noa Ellis",
    price: "$19.99",
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
  },
]

function BooksPage() {
  const navigate = useNavigate()

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
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 drop-shadow-sm">
          Books & Beyond
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Find your next page-turner from curated collections and fresh arrivals.
        </p>

        {/* Search */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex gap-2">
            <input
              type="text"
              placeholder="Search by title, author, or genre…"
              className="flex-1 rounded-xl px-4 py-3 outline-none bg-transparent placeholder-slate-400"
            />
            <button className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:shadow-md hover:from-purple-700 hover:to-pink-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Filter chips */}
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

      {/* Books Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow hover:shadow-xl transition"
            >
              <div className="overflow-hidden">
                <img
                  src={book.img}
                  alt={book.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition">
                  {book.name}
                </h3>
                <p className="mt-1 text-slate-500">{book.subtitle}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-purple-700">{book.price}</span>
                  <button className="rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow hover:shadow-md hover:from-indigo-700 hover:to-fuchsia-700 transition">
                    Add to cart
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-2xl"></div>
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
      <footer className="px-6 pb-10 text-center text-sm text-slate-500">
        © 2025 RK Stores — Happy reading!
      </footer>
    </div>
  )
}

export default BooksPage
