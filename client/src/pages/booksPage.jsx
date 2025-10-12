import React, { useState } from "react"
import { ArrowLeft, Search, ShoppingCart, Heart, Star, BookOpen, TrendingUp, Sparkles } from "lucide-react"

const filters = ["All", "Best Sellers", "New Arrivals", "Fiction", "Non-Fiction", "Kids", "Sci-Fi", "Self-Help"]

const books = [
  {
    name: "The Silent Library",
    subtitle: "by Ava Sinclair",
    price: "$14.99",
    rating: 4.8,
    reviews: 2341,
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller"
  },
  {
    name: "Orbit of Dreams",
    subtitle: "by Kai Mercer",
    price: "$18.50",
    rating: 4.9,
    reviews: 1876,
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    badge: "New"
  },
  {
    name: "Ink & Ember",
    subtitle: "by Mara Quinn",
    price: "$12.00",
    rating: 4.6,
    reviews: 987,
    img: "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Beyond the Vale",
    subtitle: "by Rowan Hale",
    price: "$16.75",
    rating: 4.7,
    reviews: 1543,
    img: "https://images.unsplash.com/photo-1528208079124-0f456cadb804?q=80&w=1200&auto=format&fit=crop",
    badge: "Editor's Pick"
  },
  {
    name: "The Paper Seas",
    subtitle: "by Elio Hart",
    price: "$11.99",
    rating: 4.5,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Starlit Chapters",
    subtitle: "by Noa Ellis",
    price: "$19.99",
    rating: 4.9,
    reviews: 3210,
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
    badge: "Award Winner"
  },
]

function BooksPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [favorites, setFavorites] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFavorite = (index) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(index)) {
      newFavorites.delete(index)
    } else {
      newFavorites.add(index)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 backdrop-blur-xl bg-white/40 border-b border-white/60 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 hover:bg-white/80 transition-all hover:scale-110 shadow-md">
              <Heart className="w-5 h-5 text-rose-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {favorites.size}
              </span>
            </button>
            <button className="relative p-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 hover:bg-white/80 transition-all hover:scale-110 shadow-md">
              <ShoppingCart className="w-5 h-5 text-violet-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center pt-16 pb-12 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-violet-700">Free shipping on orders over $30!</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 animate-gradient">
            Books & Beyond
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
          Discover stories that transport you to new worlds 📚
        </p>

        {/* Modern Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
              <Search className="w-6 h-6 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg placeholder-slate-400 text-slate-800"
              />
              <button className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                selectedFilter === f
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white/70 backdrop-blur-sm text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Books Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Badge */}
              {item.badge && (
                <div className={`absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                  item.badge === "New" 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600" 
                    : item.badge === "Award Winner"
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                    : item.badge === "Editor's Pick"
                    ? "bg-gradient-to-r from-rose-600 to-pink-600"
                    : "bg-gradient-to-r from-violet-600 to-purple-600"
                }`}>
                  {item.badge === "Bestseller" && <TrendingUp className="w-3 h-3 inline mr-1" />}
                  {item.badge === "New" && <Sparkles className="w-3 h-3 inline mr-1" />}
                  {item.badge === "Editor's Pick" && <BookOpen className="w-3 h-3 inline mr-1" />}
                  {item.badge}
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(i)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(i) ? "fill-rose-500 text-rose-500" : "text-slate-400"
                  } transition-colors`}
                />
              </button>

              {/* Image */}
              <div className="relative overflow-hidden h-80">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-700">{item.rating}</span>
                  </div>
                  <span className="text-sm text-slate-400">({item.reviews} reviews)</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-violet-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-500 mb-4">{item.subtitle}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                    {item.price}
                  </span>
                  <button className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Animated Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="group px-10 py-4 rounded-2xl font-semibold bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-violet-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="text-slate-700 group-hover:text-violet-600 transition-colors">
              Explore more amazing reads
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-white/60 backdrop-blur-sm bg-white/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 font-medium">
            © 2025 RK Stores — Happy reading! 📖
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Your gateway to endless literary adventures
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default BooksPage