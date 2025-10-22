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
} from "lucide-react";

const categories = ["All", "Fiction", "Non-Fiction", "Science", "Comics"];

const books = [
  {
    id: 1,
    name: "The Great Gatsby",
    subtitle: "Classic Fiction",
    price: "$15.99",
    originalPrice: "$19.99",
    rating: 4.8,
    reviews: 240,
    img: "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Atomic Habits",
    subtitle: "Self Improvement",
    price: "$17.50",
    rating: 4.9,
    reviews: 500,
    img: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 3,
    name: "A Brief History of Time",
    subtitle: "Science",
    price: "$18.99",
    originalPrice: "$25.99",
    rating: 4.7,
    reviews: 340,
    img: "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg",
    badge: "Classic",
    inStock: true,
  },
  {
    id: 4,
    name: "The Alchemist",
    subtitle: "Fiction / Philosophy",
    price: "$14.00",
    rating: 4.8,
    reviews: 420,
    img: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
    badge: "Inspiring",
    inStock: true,
  },
  {
    id: 5,
    name: "Dune",
    subtitle: "Science Fiction",
    price: "$22.50",
    rating: 4.6,
    reviews: 310,
    img: "https://m.media-amazon.com/images/I/91A5k3Kj-PL._AC_UF1000,1000_QL80_.jpg",
    badge: "Premium",
    inStock: false,
  },
  {
    id: 6,
    name: "Marvel Avengers: Endgame",
    subtitle: "Comics",
    price: "$12.00",
    rating: 4.5,
    reviews: 210,
    img: "https://m.media-amazon.com/images/I/81aQfWz8ZPL._AC_UF1000,1000_QL80_.jpg",
    badge: "New",
    inStock: true,
  },
];

function BookPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [page, setPage] = useState("main");
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load & sync booksCart only
  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("booksCart")) || [];
      setCartItems(stored);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  // ✅ Filter + Search
  useEffect(() => {
    let filtered = books;
    if (selectedFilter !== "All") {
      filtered = filtered.filter((b) =>
        b.subtitle.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBooks(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const handleAddToCart = (book) => {
    setSelectedBook(book);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50">
        {/* Header */}
        <nav className="bg-white/40 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex gap-4">
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-rose-500 text-white flex items-center justify-center">
                  {favorites.size}
                </span>
              </button>
              <button className="relative p-3 rounded-full bg-white shadow hover:scale-110 transition">
                <ShoppingCart className="w-5 h-5 text-violet-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-violet-500 text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center py-10 px-6">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
            Book Haven
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            Discover bestsellers, science marvels, and stories that inspire 📚
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:shadow"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-3 bg-white p-3 rounded-full shadow">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books..."
              className="flex-1 outline-none bg-transparent text-slate-700"
            />
          </div>
        </section>

        {/* Book Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 pb-12">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-4 relative"
            >
              <img
                src={book.img}
                alt={book.name}
                className="w-full h-72 object-cover rounded-2xl"
              />
              {book.badge && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {book.badge}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(book.id)}
                className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(book.id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {book.name}
                </h3>
                <p className="text-slate-500 text-sm">{book.subtitle}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-violet-600">
                    {book.price}
                  </span>
                  <button
                    disabled={!book.inStock}
                    onClick={() => handleAddToCart(book)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${
                      book.inStock
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
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

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedBook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-6">
          <img
            src={selectedBook.img}
            alt={selectedBook.name}
            className="rounded-2xl w-full h-full object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {selectedBook.name}
            </h1>
            <p className="text-slate-500 mb-4">{selectedBook.subtitle}</p>
            <p className="text-lg text-slate-600 mb-6">
              A masterpiece that captures the imagination. Dive into the world
              of stories, knowledge, and wisdom.
            </p>
            <div className="flex gap-3 items-center mb-6">
              <span className="text-3xl font-bold text-violet-600">
                {selectedBook.price}
              </span>
              {selectedBook.originalPrice && (
                <span className="text-red-400 line-through">
                  {selectedBook.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                if (!selectedBook.inStock) return;
                const storedCart =
                  JSON.parse(localStorage.getItem("/cart")) || [];
                const existingItemIndex = storedCart.findIndex(
                  (item) => item.id === selectedBook.id
                
                );
                if (existingItemIndex !== -1) {
                  storedCart[existingItemIndex].quantity += 1;
                } else {
                  storedCart.push({ ...selectedBook, quantity: 1 });
                }
                localStorage.setItem("/cart", JSON.stringify(storedCart));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/cart";
              }}
              className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Add to Cart
            </button>


            <div className="mt-8 flex gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-violet-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-purple-600" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-fuchsia-600" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default BookPage;
