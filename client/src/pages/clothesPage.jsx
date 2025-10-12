import React, { useState, useEffect } from "react"
import { ArrowLeft, Search, ShoppingCart, Heart, Star, TrendingUp, Sparkles, Shield, Truck, Zap } from "lucide-react"

const categories = ["All", "Men", "Women", "Kids", "Unisex"]

const clothes = [
  {
    id: 1,
    name: "Denim Jacket",
    subtitle: "Men's Casual",
    price: "$45.99",
    originalPrice: "$59.99",
    rating: 4.8,
    reviews: 124,
    img: "https://media.cnn.com/api/v1/images/stellar/prod/best-denim-jackets-cnnu-1.jpg?c=16x9&q=w_800,c_fill",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 2,
    name: "Casual Hoodie",
    subtitle: "Unisex",
    price: "$39.50",
    rating: 4.6,
    reviews: 89,
    img: "https://i.pinimg.com/736x/a1/17/41/a117418f595e6065354ce926476a9c08.jpg",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Summer Dress",
    subtitle: "Women's Fashion",
    price: "$59.00",
    originalPrice: "$79.99",
    rating: 4.9,
    reviews: 156,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 4,
    name: "Sports T-shirt",
    subtitle: "Unisex",
    price: "$25.00",
    rating: 4.7,
    reviews: 203,
    img: "https://t4.ftcdn.net/jpg/02/81/11/89/360_F_281118992_Pd4j1SeRRytaxx9R3vSzoFltqpzp7p5N.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Formal Blazer",
    subtitle: "Men's Formal",
    price: "$89.90",
    originalPrice: "$119.99",
    rating: 4.8,
    reviews: 78,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: false,
  },
  {
    id: 6,
    name: "Kids Outfit",
    subtitle: "Kids",
    price: "$29.50",
    rating: 4.5,
    reviews: 45,
    img: "https://as2.ftcdn.net/v2/jpg/05/19/57/97/1000_F_519579712_ku7nKyMEpk2v7S6trwaQmLaGpqxDZkgO.jpg",
    inStock: true,
  },
]

function ClothesPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [favorites, setFavorites] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredClothes, setFilteredClothes] = useState(clothes)

  useEffect(() => {
    let filtered = clothes

    if (selectedFilter !== "All") {
      filtered = filtered.filter((item) => {
        const lowerName = item.subtitle.toLowerCase()
        if (selectedFilter === "Men") return lowerName.includes("men")
        if (selectedFilter === "Women") return lowerName.includes("women")
        if (selectedFilter === "Kids") return lowerName.includes("kids")
        if (selectedFilter === "Unisex") return lowerName.includes("unisex")
        return true
      })
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredClothes(filtered)
  }, [selectedFilter, searchQuery])

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-fuchsia-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-20 backdrop-blur-xl bg-white/40 border-b border-white/60 shadow-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                4
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center pt-16 pb-12 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-violet-700">Fashion Week: Up to 40% off on trendy styles!</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 animate-gradient">
            Fashion Collection
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
          Discover your style with our premium clothing line 👗
        </p>

        {/* Modern Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
              <Search className="w-6 h-6 text-slate-400 ml-3" />
              <input
                type="text"
                placeholder="Search for jackets, dresses, hoodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg placeholder-slate-400 text-slate-800"
              />
              <button className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105"
                  : "bg-white/70 backdrop-blur-sm text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Clothes Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClothes.map((item, i) => (
            <div
              key={item.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Badge */}
              {item.badge && (
                <div className={`absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                  item.badge === "Premium" 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                    : item.badge === "New"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                    : item.badge === "Popular"
                    ? "bg-gradient-to-r from-orange-600 to-amber-600"
                    : "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                }`}>
                  {item.badge === "Bestseller" && <TrendingUp className="w-3 h-3 inline mr-1" />}
                  {item.badge === "Premium" && <Sparkles className="w-3 h-3 inline mr-1" />}
                  {item.badge}
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(item.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"
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
                
                {/* Out of Stock Overlay */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl">
                      OUT OF STOCK
                    </div>
                  </div>
                )}
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
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-red-400 line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <button 
                    disabled={!item.inStock}
                    className={`px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${
                      item.inStock 
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Discount Badge */}
                {item.originalPrice && (
                  <div className="mt-3 inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-bold rounded-lg">
                    SAVE ${(parseFloat(item.originalPrice.replace('$', '')) - parseFloat(item.price.replace('$', ''))).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Animated Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-3xl blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredClothes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No items found
            </h3>
            <p className="text-gray-500 text-lg">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="group px-10 py-4 rounded-2xl font-semibold bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-violet-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="text-slate-700 group-hover:text-violet-600 transition-colors">
              Explore more fashion items
            </span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">256-bit SSL encrypted</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">2-3 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-white/60 backdrop-blur-sm bg-white/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 font-medium">
            © 2025 RK Stores — Dress to impress! 👗
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Your destination for premium fashion and style
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

export default ClothesPage