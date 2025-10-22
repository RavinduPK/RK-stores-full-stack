import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, ShoppingCart, Heart, Star, Zap, Cpu, TrendingUp } from "lucide-react";

const filters = ["All", "Kitchen Appliances", "Home Electronics", "Office Electronics", "Smart Devices", "Wearables"];

const electronics = [
  {
    id: 1,
    name: "Smartphone",
    subtitle: "Latest Model",
    price: "$699",
    rating: 4.8,
    reviews: 2341,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Laptop",
    subtitle: "High Performance",
    price: "$1299",
    rating: 4.9,
    reviews: 1876,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Smartwatch",
    subtitle: "Fitness & Notifications",
    price: "$249",
    rating: 4.7,
    reviews: 1543,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    subtitle: "Noise Cancelling",
    price: "$199",
    rating: 4.8,
    reviews: 2098,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Coffee Maker",
    subtitle: "Smart Kitchen Appliance",
    price: "$89",
    rating: 4.6,
    reviews: 876,
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    subtitle: "Smart Lighting",
    price: "$49",
    rating: 4.5,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
  },
];

function ElectricPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState("main"); // main | details | cart
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("electronicsCart")) || [];
    setCartItems(storedCart);
  }, []);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setPage("details");
  };

  const handleAddToCartFromDetails = () => {
    const storedCart = JSON.parse(localStorage.getItem("electronicsCart")) || [];
    const existingIndex = storedCart.findIndex((i) => i.id === selectedItem.id);
    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({ ...selectedItem, quantity: 1 });
    }
    localStorage.setItem("electronicsCart", JSON.stringify(storedCart));
    setCartItems(storedCart);
    setPage("cart");
  };

  const handleBack = () => setPage("main");

  const filteredItems = electronics
    .filter((e) => selectedFilter === "All" ? true : e.subtitle.toLowerCase().includes(selectedFilter.toLowerCase()))
    .filter((e) => searchQuery.trim() === "" ? true : e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <nav className="bg-white/40 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex gap-4">
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-rose-500 text-white flex items-center justify-center">{favorites.size}</span>
              </button>
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-blue-500 text-white flex items-center justify-center">{cartItems.length}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center py-10 px-6">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Electronics Store</h1>
          <p className="text-lg text-slate-600 mt-2">Cutting-edge technology at your fingertips ⚡</p>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-3 bg-white p-3 rounded-full shadow">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search electronics..." className="flex-1 outline-none bg-transparent text-slate-700" />
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button key={f} onClick={() => setSelectedFilter(f)} className={`px-6 py-2 rounded-full font-semibold transition ${selectedFilter === f ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:shadow"}`}>
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 pb-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-4 relative">
              {item.badge && <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{item.badge}</span>}
              <button onClick={() => toggleFavorite(item.id)} className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition">
                <Heart className={`w-5 h-5 ${favorites.has(item.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
              </button>

              <img src={item.img} alt={item.name} className="w-full h-72 object-cover rounded-2xl" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                <p className="text-slate-500 text-sm">{item.subtitle}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                  <button onClick={() => handleAddToCartClick(item)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition">
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

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-10">
        <button onClick={handleBack} className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-6">
          <img src={selectedItem.img} alt={selectedItem.name} className="rounded-2xl w-full h-full object-cover" />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{selectedItem.name}</h1>
            <p className="text-slate-500 mb-4">{selectedItem.subtitle}</p>
            <p className="text-lg text-slate-600 mb-6">
              High-quality electronics to enhance your lifestyle. Enjoy premium technology with cutting-edge performance.
            </p>
            <div className="flex gap-3 items-center mb-6">
              <span className="text-3xl font-bold text-blue-600">{selectedItem.price}</span>
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
          </div>
        </div>
      </div>
    );
  }

  // ---------------- CART PAGE ----------------
  if (page === "cart") {
    return (
      <div className="min-h-screen p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <button onClick={handleBack} className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-slate-500">{item.subtitle}</p>
                  <p className="text-slate-700 font-semibold">{item.price} x {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default ElectricPage;
