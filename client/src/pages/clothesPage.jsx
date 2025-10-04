import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Star, Zap, Shield, Truck, Check, Eye, Sparkles, Layers, TrendingUp, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Men", "Women", "Kids", "Unisex"];


const clothes = [
  {
    id: 1,
    name: "Denim Jacket",
    subtitle: "Men's Casual",
    price: 45.99,
    originalPrice: 59.99,
    description: "A stylish denim jacket perfect for casual outings. Comfortable and durable.",
    img: "https://images.unsplash.com/photo-1520975918318-3f1124c4b6c5?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    material: "Denim",
    colors: ["#1f2937", "#4b5563", "#9ca3af"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
   
  },
  {
    id: 2,
    name: "Casual Hoodie",
    subtitle: "Unisex",
    price: 39.50,
    originalPrice: null,
    description: "A cozy hoodie made from soft cotton blend. Great for lounging or outdoor wear.",
    img: "https://images.unsplash.com/photo-1520975731962-3c1e6a1f3a50?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Cotton Blend",
    colors: ["#fbbf24", "#f87171", "#60a5fa"],
    rating: 4.6,
    reviews: 89,
    badge: "New",
    inStock: true,
    trending: false,
  },
  {
    id: 3,
    name: "Summer Dress",
    subtitle: "Women's Fashion",
    price: 59.00,
    originalPrice: 79.99,
    description: "Lightweight and airy summer dress with a floral design for a breezy look.",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Cotton",
    colors: ["#fbbf24", "#f472b6", "#60a5fa"],
    rating: 4.9,
    reviews: 156,
    badge: "Sale",
    inStock: true,
    trending: true,
  },
  {
    id: 4,
    name: "Sports T-shirt",
    subtitle: "Unisex",
    price: 25.00,
    originalPrice: null,
    description: "Moisture-wicking sports T-shirt designed for workouts and casual wear.",
    img: "https://images.unsplash.com/photo-1603252109360-9097f3d6d41b?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    material: "Polyester",
    colors: ["#60a5fa", "#f87171", "#10b981"],
    rating: 4.7,
    reviews: 203,
    badge: null,
    inStock: true,
    trending: false,
  },
  {
    id: 5,
    name: "Formal Blazer",
    subtitle: "Men's Formal",
    price: 89.90,
    originalPrice: 119.99,
    description: "Elegant formal blazer tailored for office and special occasions.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    sizes: ["M", "L", "XL"],
    material: "Wool Blend",
    colors: ["#1f2937", "#374151"],
    rating: 4.8,
    reviews: 78,
    badge: "Premium",
    inStock: false,
    trending: false,
  },
  {
    id: 6,
    name: "Kids Outfit",
    subtitle: "Kids",
    price: 29.50,
    originalPrice: null,
    description: "Cute and comfy kids outfit perfect for daily wear.",
    img: "https://images.unsplash.com/photo-1603252109234-d84bb2bbec3d?q=80&w=1200&auto=format&fit=crop",
    sizes: ["XS", "S", "M"],
    material: "Cotton",
    colors: ["#fbbf24", "#f472b6"],
    rating: 4.5,
    reviews: 45,
    badge: null,
    inStock: true,
    trending: false,
  },
];

function ClothesPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredClothes, setFilteredClothes] = useState(clothes);
  const [favorites, setFavorites] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    let filtered = clothes;

    if (filterCategory !== "All") {
      filtered = filtered.filter((item) => {
        const lowerName = item.subtitle.toLowerCase();
        if (filterCategory === "Men") return lowerName.includes("men");
        if (filterCategory === "Women") return lowerName.includes("women");
        if (filterCategory === "Kids") return lowerName.includes("kids");
        if (filterCategory === "Unisex") return lowerName.includes("unisex");
        return true;
      });
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClothes(filtered);
  }, [filterCategory, searchQuery]);

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (item) => {
    if (!selectedSize || !selectedColor) return;
    setIsLoading(true);
    setTimeout(() => {
      setCartCount(prev => prev + 1);
      setAddedToCart(true);
      setIsLoading(false);
      setTimeout(() => setAddedToCart(false), 3000);
    }, 1000);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Popular": return "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-orange-200";
      case "New": return "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 shadow-emerald-200";
      case "Sale": return "bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 shadow-rose-200";
      case "Premium": return "bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 shadow-purple-200";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-200";
    }
  };

  const quickAddToCart = (e, item) => {
    e.stopPropagation();
    if (item.sizes.length > 0 && item.colors.length > 0) {
      setCartCount(prev => prev + 1);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-xl shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <button
                        onClick={() => navigate("/products1")}
                        className="text-white font-black text-lg"
                      >
                        RK
                      </button>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-sm"></div>
                  </div>
                  <div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  RK Stores
                </span>
                <div 
                onClick={() => navigate("/products1")}
                className="text-xs text-blue-600 font-medium">Premium Collection</div>
              </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 px-2 py-1 mt-2 mx-10 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full">
                    <TrendingUp className="w-4 h-3 text-emerald-600" />
                    <span className="text-emerald-700 text-xs font-semibold">
                      Trending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all lg:hidden transform hover:scale-110"
              >
                <Filter className="w-5 h-5" />
              </button>

              <div className="relative group">
                <button
                  onClick={() => console.log("Navigate to cart")}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {cartCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {!selectedItem ? (
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Enhanced Search & Categories */}
          <div
            className={`bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-10 transition-all duration-500 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-indigo-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Discover your perfect style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-2 border-indigo-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 placeholder-indigo-400 text-lg font-medium"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                      filterCategory === cat
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-purple-500/25 scale-105"
                        : "bg-white/70 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-800 shadow-lg border border-indigo-200/50"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {filterCategory === cat && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-indigo-200/30">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Premium Quality
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Secure Shopping
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Free Shipping
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredClothes.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl hover:border-purple-200/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-4 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedSize("");
                  setSelectedColor("");
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-72 object-cover group-hover:scale-125 transition-transform duration-700"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badge */}
                  {item.badge && (
                    <div
                      className={`absolute top-4 left-4 px-4 py-2 text-xs font-black text-white rounded-2xl shadow-2xl ${getBadgeColor(
                        item.badge
                      )} animate-pulse`}
                    >
                      {item.badge}
                    </div>
                  )}

                  {/* Trending Indicator */}
                  {item.trending && (
                    <div className="absolute top-4 right-16 p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg animate-bounce">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white shadow-xl transition-all duration-300 transform hover:scale-125 group/heart"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites.has(item.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-indigo-600 group-hover/heart:text-rose-500"
                      }`}
                    />
                  </button>

                  {/* Quick Add Button
                  <button
                    onClick={(e) => quickAddToCart(e, item)}
                    className={`absolute bottom-4 right-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl transform transition-all duration-300 ${
                      hoveredCard === item.id
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    } hover:scale-110`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button> */}

                  {/* Stock Status */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-red-600 text-white font-black px-6 py-3 rounded-2xl shadow-xl animate-pulse">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-bold text-amber-700">
                        {item.rating}
                      </span>
                      <span className="text-xs text-amber-600">
                        ({item.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-indigo-600 font-semibold">
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-1 group-hover:text-purple-700 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600/80 uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Price & Colors */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-red-400 line-through font-semibold">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.originalPrice && (
                        <div className="inline-block px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-bold rounded-lg">
                          SAVE ${(item.originalPrice - item.price).toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border-3 border-white shadow-lg ring-2 ring-gray-200 transform hover:scale-125 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 border-3 border-white shadow-lg flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            +
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Material Badge */}
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200">
                    {item.material}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {filteredClothes.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-16 h-16 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No items found
              </h3>
              <p className="text-gray-500 text-lg">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Enhanced Product Details */
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 p-10">
              {/* Enhanced Image Section */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.name}
                    className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {selectedItem.badge && (
                    <div
                      className={`absolute top-6 left-6 px-6 py-3 text-sm font-black text-white rounded-2xl shadow-2xl ${getBadgeColor(
                        selectedItem.badge
                      )} animate-pulse`}
                    >
                      {selectedItem.badge}
                    </div>
                  )}

                  {selectedItem.trending && (
                    <div className="absolute top-6 right-6 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg animate-bounce">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Details Section */}
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-2xl shadow-lg">
                      <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                      <span className="text-xl font-black text-amber-700 ml-2">
                        {selectedItem.rating}
                      </span>
                      <span className="text-amber-600/80 ml-1 font-semibold">
                        ({selectedItem.reviews} reviews)
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(selectedItem.id)}
                      className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-all transform hover:scale-110 shadow-lg group"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.has(selectedItem.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-rose-400 group-hover:text-rose-500"
                        }`}
                      />
                    </button>
                  </div>

                  <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-3">
                    {selectedItem.name}
                  </h1>
                  <p className="text-xl font-bold text-indigo-600/80 uppercase tracking-wider mb-6">
                    {selectedItem.subtitle}
                  </p>

                  {/* Enhanced Price Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200/50 mb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                        ${selectedItem.price}
                      </span>
                      {selectedItem.originalPrice && (
                        <span className="text-2xl text-red-400 line-through font-bold">
                          ${selectedItem.originalPrice}
                        </span>
                      )}
                    </div>
                    {selectedItem.originalPrice && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-black rounded-xl shadow-lg">
                        SAVE $
                        {(
                          selectedItem.originalPrice - selectedItem.price
                        ).toFixed(2)}
                      </div>
                    )}
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {selectedItem.description}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 font-bold rounded-xl border border-indigo-200">
                      Material: {selectedItem.material}
                    </div>
                    {selectedItem.inStock ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 font-bold rounded-xl">
                        <Check className="w-4 h-4" />
                        In Stock
                      </div>
                    ) : (
                      <div className="px-4 py-2 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 font-bold rounded-xl">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Size Selection */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-indigo-600" />
                    Size
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedItem.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative p-4 rounded-2xl border-3 font-black text-lg transition-all duration-300 transform hover:scale-110 overflow-hidden ${
                          selectedSize === size
                            ? "border-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 shadow-2xl shadow-purple-500/25 scale-110"
                            : "border-indigo-200 text-indigo-700 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 shadow-lg"
                        }`}
                      >
                        {size}
                        {selectedSize === size && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Color Selection */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    Color
                  </h3>
                  <div className="flex gap-4">
                    {selectedItem.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-16 h-16 rounded-2xl border-4 transition-all duration-300 hover:scale-125 shadow-2xl ${
                          selectedColor === color
                            ? "border-indigo-800 shadow-2xl ring-4 ring-indigo-200 scale-125"
                            : "border-white hover:border-indigo-300"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white drop-shadow-2xl" />
                          </div>
                        )}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Features */}
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-6 rounded-2xl border border-gray-200">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-xl">
                        <Truck className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-gray-700">Free Shipping</p>
                      <p className="text-xs text-gray-500">
                        On orders over $50
                      </p>
                    </div>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-xl">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-gray-700">Secure Payment</p>
                      <p className="text-xs text-gray-500">
                        256-bit SSL encrypted
                      </p>
                    </div>
                    <div className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-xl">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-gray-700">Fast Delivery</p>
                      <p className="text-xs text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAddToCart(selectedItem)}
                      disabled={
                        !selectedSize ||
                        !selectedColor ||
                        !selectedItem.inStock ||
                        isLoading
                      }
                      className="flex-1 relative py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-lg rounded-2xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:transform-none overflow-hidden group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : addedToCart ? (
                        <>
                          <Check className="w-6 h-6 animate-bounce" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          Add to Cart
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-8 py-5 bg-gradient-to-r from-gray-100 to-indigo-100 text-indigo-700 font-black text-lg rounded-2xl hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                      Back
                    </button>
                  </div>

                  {/* Selection Warning */}
                  {(!selectedSize || !selectedColor) && (
                    <div className="bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-200 rounded-2xl p-4 animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            !
                          </span>
                        </div>
                        <p className="text-rose-700 font-bold">
                          Please select {!selectedSize && "size"}{" "}
                          {!selectedSize && !selectedColor && "and"}{" "}
                          {!selectedColor && "color"} to add to cart
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Toast Notification */}
      {addedToCart && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-8 py-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce backdrop-blur-md border-2 border-emerald-400/50 transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <p className="font-black text-lg">Success!</p>
              <p className="text-emerald-100 text-sm">Item added to cart</p>
            </div>
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-gray-700">
              {filteredClothes.filter((item) => item.inStock).length} items
              available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClothesPage;   