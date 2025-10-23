import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Gift,
  Sparkles,
  Award,
  Shield,
  Truck,
} from "lucide-react";

const filters = ["All", "Birthday", "Anniversary", "Valentine", "Corporate", "Luxury"];

const giftsData = [
  {
    id: 1,
    name: "Luxury Gift Box",
    subtitle: "Elegant packaging with premium items",
    price: "$129",
    rating: 4.9,
    reviews: 876,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
    badge: "Luxury",
    inStock: true,
  },
  {
    id: 2,
    name: "Flower & Chocolate Combo",
    subtitle: "Perfect for special occasions",
    price: "$79",
    rating: 4.8,
    reviews: 1234,
    img: "https://images.unsplash.com/photo-1606800052052-1e99b8d2b6f4?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 3,
    name: "Personalized Mug",
    subtitle: "Custom printed mugs",
    price: "$25",
    rating: 4.6,
    reviews: 543,
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Teddy Bear",
    subtitle: "Soft & cuddly toy gift",
    price: "$45",
    rating: 4.7,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1563454101682-5a7b8a6f3c2d?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 5,
    name: "Corporate Gift Set",
    subtitle: "Premium pens & accessories",
    price: "$99",
    rating: 4.8,
    reviews: 432,
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 6,
    name: "Valentine Hamper",
    subtitle: "Roses, chocolates & wine",
    price: "$149",
    rating: 4.9,
    reviews: 987,
    img: "https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=1200&auto=format&fit=crop",
    badge: "Special",
    inStock: true,
  },
];

function GiftsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGifts, setFilteredGifts] = useState(giftsData);
  const [page, setPage] = useState("main"); // "main" or "details"
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load and update cart
  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("/cart")) || [];
      setCartItems(stored);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = giftsData;

    if (selectedFilter !== "All") {
      filtered = filtered.filter((item) =>
        item.subtitle.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGifts(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setFavorites(updated);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  // ---------- MAIN PAGE ----------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-rose-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-red-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-20 backdrop-blur-xl bg-white/40 border-b border-white/60 shadow-lg sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favorites.size}
                </span>
              </button>
              <button className="relative p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md">
                <ShoppingCart className="w-5 h-5 text-rose-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative z-10 text-center pt-16 pb-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 mb-6 animate-bounce">
            <Gift className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-semibold text-rose-700">
              Free gift wrapping on all orders!
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 animate-gradient">
              Gifts Collection
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Thoughtful presents for every celebration 🎁
          </p>

          {/* Search */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                <Search className="w-6 h-6 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for birthday, anniversary, valentine gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-lg placeholder-slate-400 text-slate-800"
                />
                <button className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  selectedFilter === f
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-105"
                    : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Gifts Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGifts.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-2 transition-all"
              >
                {/* Badge */}
                {item.badge && (
                  <div
                    className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                      item.badge === "Luxury"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : item.badge === "Premium"
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                        : item.badge === "Special"
                        ? "bg-gradient-to-r from-red-600 to-rose-600"
                        : "bg-gradient-to-r from-rose-600 to-pink-600"
                    }`}
                  >
                    {item.badge === "Luxury" && (
                      <Award className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge === "Special" && (
                      <Sparkles className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge === "Bestseller" && (
                      <Gift className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge}
                  </div>
                )}

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(item.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Image */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Details */}
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

                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 mb-4">{item.subtitle}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                      {item.price}
                    </span>
                    <button
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item)}
                      className={`px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
                        item.inStock
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:scale-105"
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

  // ---------- DETAILS PAGE ----------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-6 backdrop-blur-xl">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-full object-cover"
          />

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
            <p className="text-lg text-slate-600 mb-6">
              Make every moment unforgettable with this curated gift designed to
              impress and delight. Perfect for special occasions or luxury gifting.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                {selectedItem.price}
              </span>
            </div>

            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("/cart")) || [];
                const existing = stored.find((i) => i.id === selectedItem.id);
                if (existing) existing.quantity += 1;
                else stored.push({ ...selectedItem, quantity: 1 });
                localStorage.setItem("/cart", JSON.stringify(stored));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/cart";
              }}
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              Add to Cart
            </button>

            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2 bg-rose-100 p-4 rounded-xl shadow-md">
                <Shield className="w-6 h-6 text-rose-700" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-100 p-4 rounded-xl shadow-md">
                <Truck className="w-6 h-6 text-pink-700" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-red-100 p-4 rounded-xl shadow-md">
                <Sparkles className="w-6 h-6 text-red-700" />
                <span>Luxury Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default GiftsPage;
