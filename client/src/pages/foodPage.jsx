import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Search, ShoppingCart, Heart, Star, Flame, TrendingUp, Zap 
} from "lucide-react";

const filters = ["All", "Fast Food", "Snacks", "Healthy", "Desserts", "Drinks"];

const foods = [
  {
    id: 1,
    name: "Cheese Burger",
    subtitle: "Fast Food",
    price: "$5.99",
    rating: 4.8,
    reviews: 342,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Pizza Slice",
    subtitle: "Fast Food",
    price: "$3.50",
    rating: 4.7,
    reviews: 289,
    img: "https://images.unsplash.com/photo-1548365328-9d89f85a56c3?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 3,
    name: "Fruit Bowl",
    subtitle: "Healthy",
    price: "$4.25",
    rating: 4.9,
    reviews: 456,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Chocolate Cake",
    subtitle: "Dessert",
    price: "$6.50",
    rating: 4.8,
    reviews: 521,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 5,
    name: "Ice Cream Cone",
    subtitle: "Dessert",
    price: "$2.75",
    rating: 4.6,
    reviews: 198,
    img: "https://images.unsplash.com/photo-1508739826987-b79cd8b7da12?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 6,
    name: "Fresh Juice",
    subtitle: "Drinks",
    price: "$3.20",
    rating: 4.7,
    reviews: 267,
    img: "https://images.unsplash.com/photo-1577801596755-d6fdcfc5965f?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
];

function FoodsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState("main"); // main | details | cart
  const [selectedFood, setSelectedFood] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("foodsCart")) || [];
    setCartItems(storedCart);
  }, []);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const handleAddToCartClick = (food) => {
    setSelectedFood(food);
    setPage("details");
  };

  const handleAddToCartFromDetails = () => {
    const storedCart = JSON.parse(localStorage.getItem("foodsCart")) || [];
    const existingIndex = storedCart.findIndex((i) => i.id === selectedFood.id);
    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({ ...selectedFood, quantity: 1 });
    }
    localStorage.setItem("foodsCart", JSON.stringify(storedCart));
    setCartItems(storedCart);
    setPage("cart");
  };

  const handleBack = () => setPage("main");

  const filteredFoods = foods
    .filter((f) => selectedFilter === "All" ? true : f.subtitle.toLowerCase().includes(selectedFilter.toLowerCase()))
    .filter((f) => searchQuery.trim() === "" ? true : f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        {/* Header */}
        <nav className="bg-white/40 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex gap-4">
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-rose-500 text-white flex items-center justify-center">{favorites.size}</span>
              </button>
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-orange-500 text-white flex items-center justify-center">{cartItems.length}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-10 px-6">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">Delicious Foods</h1>
          <p className="text-lg text-slate-600 mt-2">Tasty, fresh, and irresistible meals for every mood 🍔</p>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-3 bg-white p-3 rounded-full shadow">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search foods..." className="flex-1 outline-none bg-transparent text-slate-700" />
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button key={f} onClick={() => setSelectedFilter(f)} className={`px-6 py-2 rounded-full font-semibold transition ${selectedFilter === f ? "bg-gradient-to-r from-rose-600 to-orange-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:shadow"}`}>
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Food Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 pb-12">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-4 relative">
              {food.badge && <span className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{food.badge}</span>}
              <button onClick={() => toggleFavorite(food.id)} className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition">
                <Heart className={`w-5 h-5 ${favorites.has(food.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
              </button>

              <img src={food.img} alt={food.name} className="w-full h-72 object-cover rounded-2xl" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-800">{food.name}</h3>
                <p className="text-slate-500 text-sm">{food.subtitle}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-rose-600">{food.price}</span>
                  <button onClick={() => handleAddToCartClick(food)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-rose-600 to-orange-600 hover:scale-105 transition`}>
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
  if (page === "details" && selectedFood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-10">
        <button onClick={handleBack} className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-lg hover:scale-105 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-6">
          <img src={selectedFood.img} alt={selectedFood.name} className="rounded-2xl w-full h-full object-cover" />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{selectedFood.name}</h1>
            <p className="text-slate-500 mb-4">{selectedFood.subtitle}</p>
            <p className="text-lg text-slate-600 mb-6">
              Delicious and fresh, perfect to satisfy your cravings. Enjoy our premium foods with quality ingredients.
            </p>
            <div className="flex gap-3 items-center mb-6">
              <span className="text-3xl font-bold text-rose-600">{selectedFood.price}</span>
            </div>
           <button
              onClick={() => {
                if (!selectedFood.inStock) return;
                const storedCart =
                  JSON.parse(localStorage.getItem("/cart")) || [];
                const existingItemIndex = storedCart.findIndex(
                  (item) => item.id === selectedFood.id
                
                );
                if (existingItemIndex !== -1) {
                  storedCart[existingItemIndex].quantity += 1;
                } else {
                  storedCart.push({ ...selectedFood, quantity: 1 });
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
      <div className="min-h-screen p-10 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <button onClick={handleBack} className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-lg hover:scale-105 transition">
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

export default FoodsPage;
