import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Zap,
  Cpu,
  TrendingUp,
} from "lucide-react";

const categories = [
  "All",
  "Kitchen Appliances",
  "Home Electronics",
  "Office Electronics",
  "Smart Devices",
  "Wearables",
];

const electronicsData = [
  {
    id: 1,
    name: "Smartphone",
    subtitle: "Latest Model",
    price: 699,
    rating: 4.8,
    reviews: 2341,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Laptop",
    subtitle: "High Performance",
    price: 1299,
    rating: 4.9,
    reviews: 1876,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Smartwatch",
    subtitle: "Fitness & Notifications",
    price: 249,
    rating: 4.7,
    reviews: 1543,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    subtitle: "Noise Cancelling",
    price: 199,
    rating: 4.8,
    reviews: 2098,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Coffee Maker",
    subtitle: "Smart Kitchen Appliance",
    price: 89,
    rating: 4.6,
    reviews: 876,
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    subtitle: "Smart Lighting",
    price: 49,
    rating: 4.5,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
  },
];

const ElectricPage = () => {
  const [page, setPage] = useState("main");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("electronicsCart")) || [];
    setCart(stored);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("electronicsCart", JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const filteredItems = electronicsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.subtitle.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const openDetails = (item) => {
    setSelectedItem(item);
    setPage("details");
  };

  const goBack = () => setPage("main");

  // -------------------- MAIN PAGE --------------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-lg shadow">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <Heart className="w-5 h-5 text-rose-500" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {favorites.size}
                </span>
              </button>
              <button
                onClick={() => setPage("cart")}
                className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition"
              >
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center py-10 px-6">
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Electronics Store
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Discover innovation & technology ⚡
          </p>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto bg-white shadow rounded-full flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none px-3 text-slate-700"
            />
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-600 hover:shadow"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition relative"
            >
              {item.badge && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}

              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 shadow hover:scale-110 transition"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(item.id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <img
                src={item.img}
                alt={item.name}
                className="w-full h-72 object-cover rounded-2xl"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-sm">{item.subtitle}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => openDetails(item)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------- DETAILS PAGE --------------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-10">
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-6">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-full object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {selectedItem.name}
            </h1>
            <p className="text-slate-500 mb-4">{selectedItem.subtitle}</p>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-slate-700">
                {selectedItem.rating} ({selectedItem.reviews} reviews)
              </span>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Experience cutting-edge technology with our premium{" "}
              {selectedItem.name.toLowerCase()}. Built for speed, efficiency,
              and style — the perfect choice for modern living.
            </p>
            <p className="text-3xl font-bold text-blue-600 mb-8">
              ${selectedItem.price}
            </p>

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
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg hover:scale-105 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------- CART PAGE --------------------
  if (page === "cart") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-10">
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-slate-500">{item.subtitle}</p>
                    <p className="text-slate-700 font-semibold">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="text-right text-3xl font-bold text-indigo-700">
              Total: $
              {cart
                .reduce((sum, i) => sum + i.price * i.quantity, 0)
                .toFixed(2)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ElectricPage;
