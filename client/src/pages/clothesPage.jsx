import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Star, Zap, Shield, Truck, Check } from "lucide-react";
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
    badge: "Popular",
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
  },
];

function ClothesPage() {

  const navigate = useNavigate();
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
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    setCartCount(prev => prev + 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Popular": return "bg-gradient-to-r from-orange-500 to-amber-500";
      case "New": return "bg-gradient-to-r from-emerald-500 to-green-500";
      case "Sale": return "bg-gradient-to-r from-rose-500 to-red-500";
      case "Premium": return "bg-gradient-to-r from-purple-500 to-indigo-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const navigateBack = () => console.log("Navigate back");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-indigo-100/50 shadow-lg shadow-indigo-100/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/products1")}
              className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Fashion Collection</h1>
              <p className="text-sm text-indigo-600/70">{filteredClothes.length} items</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors lg:hidden"
            >
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
              onClick={() => navigate("/cart")}
              className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                <ShoppingCart className="w-5 h-5" />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {!selectedItem ? (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search & Categories */}
          <div className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 p-6 mb-8 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Search for clothes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-indigo-400"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterCategory === cat ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" : "bg-indigo-50 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-800"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClothes.map((item) => (
              <div
                key={item.id}
                className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100/50 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:rotate-1"
                onClick={() => { setSelectedItem(item); setSelectedSize(""); setSelectedColor(""); }}
              >
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"/>
                  {item.badge && <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg ${getBadgeColor(item.badge)} animate-pulse`}>{item.badge}</span>}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all transform hover:scale-110"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-rose-500 text-rose-500' : 'text-indigo-600'}`} />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/50 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-semibold bg-red-600 px-4 py-2 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-indigo-700 ml-1 font-medium">{item.rating}</span>
                      <span className="text-sm text-indigo-500/70 ml-1">({item.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-indigo-900 mb-1 group-hover:text-purple-700 transition-colors">{item.name}</h3>
                  <p className="text-sm text-indigo-600/70 mb-3">{item.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">${item.price}</span>
                      {item.originalPrice && <span className="text-sm text-red-400 line-through">${item.originalPrice}</span>}
                    </div>
                    <div className="flex gap-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div key={idx} className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color }}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Product Details */
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-indigo-200/50 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Image */}
              <div className="relative">
                <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-96 lg:h-full object-cover rounded-xl shadow-lg"/>
                {selectedItem.badge && <span className={`absolute top-4 left-4 px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg ${getBadgeColor(selectedItem.badge)} animate-pulse`}>{selectedItem.badge}</span>}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 fill-amber-500 text-amber-500"/>
                      <span className="text-lg text-amber-700 ml-1 font-bold">{selectedItem.rating}</span>
                      <span className="text-amber-600/70 ml-1">({selectedItem.reviews} reviews)</span>
                    </div>
                    <button onClick={() => toggleFavorite(selectedItem.id)} className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors">
                      <Heart className={`w-5 h-5 ${favorites.has(selectedItem.id) ? 'fill-rose-500 text-rose-500' : 'text-rose-400'}`}/>
                    </button>
                  </div>

                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent mb-2">{selectedItem.name}</h1>
                  <p className="text-lg text-indigo-600/80 mb-4">{selectedItem.subtitle}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">${selectedItem.price}</span>
                    {selectedItem.originalPrice && <span className="text-xl text-red-400 line-through">${selectedItem.originalPrice}</span>}
                    {selectedItem.originalPrice && <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-sm font-semibold rounded-full">Save ${(selectedItem.originalPrice - selectedItem.price).toFixed(2)}</span>}
                  </div>

                  <p className="text-indigo-700 leading-relaxed">{selectedItem.description}</p>
                  <p className="text-sm text-indigo-600/70 bg-indigo-50 px-3 py-1 rounded-lg inline-block">Material: {selectedItem.material}</p>
                </div>

                {/* Size */}
                <div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-3">Size</h3>
                  <div className="flex gap-3 flex-wrap">
                    {selectedItem.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl border-2 font-semibold transition-all transform hover:scale-105 ${selectedSize===size ? "border-purple-600 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 shadow-lg" : "border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-3">Color</h3>
                  <div className="flex gap-3">
                    {selectedItem.colors.map((color, idx) => (
                      <button key={idx} onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-3 transition-all hover:scale-110 shadow-lg ${selectedColor===color ? "border-indigo-800 shadow-2xl ring-4 ring-indigo-200" : "border-indigo-300"}`}
                        style={{ backgroundColor: color }}>
                        {selectedColor===color && <Check className="w-5 h-5 text-white mx-auto drop-shadow-lg"/>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-indigo-200">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1"/>
                    <p className="text-sm text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-1"/>
                    <p className="text-sm text-gray-600">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-orange-600 mx-auto mb-1"/>
                    <p className="text-sm text-gray-600">Fast Delivery</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button onClick={() => handleAddToCart(selectedItem)}
                    disabled={!selectedSize || !selectedColor || !selectedItem.inStock}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none">
                    {addedToCart ? (<><Check className="w-5 h-5"/> Added to Cart!</>) : (<><ShoppingCart className="w-5 h-5"/> Add to Cart</>)}
                  </button>

                  <button onClick={() => setSelectedItem(null)}
                    className="px-6 py-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-bold rounded-xl hover:from-indigo-200 hover:to-purple-200 transition-all transform hover:scale-105">
                    Back
                  </button>
                </div>

                {(!selectedSize || !selectedColor) && (
                  <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-xl p-3">
                    <p className="text-sm text-rose-700 text-center font-medium">Please select size and color to add to cart</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {addedToCart && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-md border border-emerald-400/50">
          <div className="bg-white/20 p-2 rounded-full"><Check className="w-5 h-5"/></div>
          <span className="font-semibold">Item added to cart!</span>
        </div>
      )}
    </div>
  );
}

export default ClothesPage;
