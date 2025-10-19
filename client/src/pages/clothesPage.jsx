import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Sparkles,
  Shield,
  Truck,
  Zap,
  PrinterCheck,
} from "lucide-react";

const categories = ["All", "Men", "Women", "Kids", "Unisex"];

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
];

function ClothesPage() {
  const [selectedFilter, setSelectedFilter] = useState("selectedFilter");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClothes, setFilteredClothes] = useState(clothes);
  const [page, setPage] = useState("main"); // "main" | "details" | "cart"
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let filtered = clothes;
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("/cart")) || [];
      setCartItems(storedCart);
    };

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };

    if (selectedFilter !== "All") {
      filtered = filtered.filter((item) => {
        const lowerName = item.subtitle.toLowerCase();
        if (selectedFilter === "Men") return lowerName.includes("men");
        if (selectedFilter === "Women") return lowerName.includes("women");
        if (selectedFilter === "Kids") return lowerName.includes("kids");
        if (selectedFilter === "Unisex") return lowerName.includes("unisex");
        return true;
      });
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClothes(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) newFavorites.delete(itemId);
    else newFavorites.add(itemId);
    setFavorites(newFavorites);
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) return;
    setSelectedItem(item);
    setPage("details");
  };

  const handleAddToCartFromDetails = () => {
    if (!selectedItem.inStock) return;
    setCartItems((prev) => [...prev, selectedItem]);
    setPage("cart");
  };

  const handleBack = () => {
    setPage("main");
  };

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-violet-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-fuchsia-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
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
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero + Promo */}
        <section className="relative z-10 text-center pt-16 pb-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-700">
              Fashion Week: Up to 40% off!
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 animate-gradient">
              Fashion Collection
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
            Discover your style with our premium clothing line 👗
          </p>

          {/* Search */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                <Search className="w-6 h-6 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search jackets, dresses, hoodies..."
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

          {/* Category Filters */}
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
            {filteredClothes.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {item.badge && (
                  <div
                    className={`absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                      item.badge === "Premium"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : item.badge === "New"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                        : item.badge === "Popular"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600"
                        : "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                    }`}
                  >
                    {item.badge === "Bestseller" && (
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge === "Premium" && (
                      <Sparkles className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge}
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(item.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-400"
                    } transition-colors`}
                  />
                </button>

                <div className="relative overflow-hidden h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      {item.rating}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({item.reviews} reviews)
                    </span>
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
                      onClick={() => handleAddToCart(item)}
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ---------------- PRODUCT DETAILS PAGE ----------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-6 backdrop-blur-xl">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              {selectedItem.name}
            </h1>
            <p className="text-slate-500 mb-4">{selectedItem.subtitle}</p>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 font-semibold">
                {selectedItem.rating} ({selectedItem.reviews} reviews)
              </span>
            </div>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Discover the perfect blend of style and comfort. Made from premium
              quality materials with modern cuts and lasting durability.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                {selectedItem.price}
              </span>
              {selectedItem.originalPrice && (
                <span className="text-xl text-red-400 line-through">
                  {selectedItem.originalPrice}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                if (!selectedItem.inStock) return;
                const storedCart =
                  JSON.parse(localStorage.getItem("/cart")) || [];
                const existingItemIndex = storedCart.findIndex(
                  (item) => item.id === selectedItem.id
                
                );
                if (existingItemIndex !== -1) {
                  storedCart[existingItemIndex].quantity += 1;
                } else {
                  storedCart.push({ ...selectedItem, quantity: 1 });
                }
                localStorage.setItem("/cart", JSON.stringify(storedCart));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/cart";
              }}
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Add to Cart
            </button>

            {/* UI/UX Highlights */}
            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2 bg-violet-100 p-4 rounded-xl shadow-md">
                <Shield className="w-6 h-6 text-violet-600" />
                <span className="text-slate-700 font-medium">
                  Secure Checkout
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 p-4 rounded-xl shadow-md">
                <Truck className="w-6 h-6 text-purple-600" />
                <span className="text-slate-700 font-medium">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 bg-fuchsia-100 p-4 rounded-xl shadow-md">
                <Zap className="w-6 h-6 text-fuchsia-600" />
                <span className="text-slate-700 font-medium">
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ClothesPage;
