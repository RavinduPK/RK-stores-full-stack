import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Wrench,
  Hammer,
  Shield,
  Truck,
  Zap,
} from "lucide-react";

const categories = ["All", "Hand Tools", "Power Tools", "DIY", "Workshop"];

const toolsData = [
  {
    id: 1,
    name: "Hammer",
    subtitle: "Strong steel hammer for DIY",
    price: "$15",
    rating: 4.7,
    reviews: 543,
    img: "https://images.unsplash.com/photo-1581093806997-124204d9fa89?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Screwdriver Set",
    subtitle: "Multi-size precision kit",
    price: "$20",
    rating: 4.8,
    reviews: 432,
    img: "https://images.unsplash.com/photo-1595278069441-2f9b391d4bdb?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Cordless Drill",
    subtitle: "Rechargeable with multiple bits",
    price: "$65",
    rating: 4.9,
    reviews: 876,
    img: "https://images.unsplash.com/photo-1607860108855-5d43f0e87d75?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 4,
    name: "Measuring Tape",
    subtitle: "Durable 5m tape measure",
    price: "$8",
    rating: 4.5,
    reviews: 321,
    img: "https://images.unsplash.com/photo-1611930022073-3f89b6e22b4c?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 5,
    name: "Wrench Set",
    subtitle: "Complete adjustable set",
    price: "$35",
    rating: 4.7,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1633158829571-8f8aeecc65c1?q=80&w=1200&auto=format&fit=crop",
    badge: "Pro Choice",
    inStock: true,
  },
  {
    id: 6,
    name: "Toolbox",
    subtitle: "Compact box for all essentials",
    price: "$45",
    rating: 4.6,
    reviews: 398,
    img: "https://images.unsplash.com/photo-1606379229235-574da5b1c7ef?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
  },
];

function ToolsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState(toolsData);
  const [page, setPage] = useState("main"); // "main" | "details"
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("/cart")) || [];
      setCartItems(stored);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    let filtered = toolsData;

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

    setFilteredTools(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setFavorites(updated);
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) return;
    setSelectedItem(item);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-amber-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-slate-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-20 backdrop-blur-xl bg-white/40 border-b border-white/60 shadow-lg sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:scale-105 transition-all"
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
                <ShoppingCart className="w-5 h-5 text-amber-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 text-center pt-16 pb-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 mb-6 animate-bounce">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              Save 25% on pro tools this month!
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-amber-700 to-orange-600 animate-gradient">
              Tools & Equipment
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Professional tools built to last ⚙️
          </p>

          {/* Search */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-slate-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                <Search className="w-6 h-6 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search drills, wrenches, saws..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-lg placeholder-slate-400 text-slate-800"
                />
                <button className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:scale-105 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105"
                    : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-2 transition-all"
              >
                {item.badge && (
                  <div
                    className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                      item.badge === "Premium"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : item.badge === "Pro Choice"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : "bg-gradient-to-r from-amber-600 to-orange-600"
                    }`}
                  >
                    {item.badge}
                  </div>
                )}

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

                <div className="relative overflow-hidden h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl">
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
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 mb-4">{item.subtitle}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
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

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:scale-105 transition-all"
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
              Built with durability, power, and precision to tackle any project.
              Perfect for both professionals and DIY enthusiasts.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
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
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              Add to Cart
            </button>

            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2 bg-amber-100 p-4 rounded-xl shadow-md">
                <Shield className="w-6 h-6 text-amber-700" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 p-4 rounded-xl shadow-md">
                <Truck className="w-6 h-6 text-orange-700" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-4 rounded-xl shadow-md">
                <Wrench className="w-6 h-6 text-slate-700" />
                <span>Pro Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ToolsPage;
