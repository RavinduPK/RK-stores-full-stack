import React, { useState, useEffect } from "react";
import { FaBackward, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Men", "Women", "Kids", "Unisex"];

const clothes = [
  {
    name: "Denim Jacket",
    subtitle: "Men's Casual",
    price: "$45.99",
    description: "A stylish denim jacket perfect for casual outings. Comfortable and durable.",
    img: "https://images.unsplash.com/photo-1520975918318-3f1124c4b6c5?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    material: "Denim",
    colors: ["#1f2937", "#4b5563", "#9ca3af"],
  },
  {
    name: "Casual Hoodie",
    subtitle: "Unisex",
    price: "$39.50",
    description: "A cozy hoodie made from soft cotton blend. Great for lounging or outdoor wear.",
    img: "https://images.unsplash.com/photo-1520975731962-3c1e6a1f3a50?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Cotton Blend",
    colors: ["#fbbf24", "#f87171", "#60a5fa"],
  },
  {
    name: "Summer Dress",
    subtitle: "Women's Fashion",
    price: "$59.00",
    description: "Lightweight and airy summer dress with a floral design for a breezy look.",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Cotton",
    colors: ["#fbbf24", "#f472b6", "#60a5fa"],
  },
  {
    name: "Sports T-shirt",
    subtitle: "Unisex",
    price: "$25.00",
    description: "Moisture-wicking sports T-shirt designed for workouts and casual wear.",
    img: "https://images.unsplash.com/photo-1603252109360-9097f3d6d41b?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    material: "Polyester",
    colors: ["#60a5fa", "#f87171", "#10b981"],
  },
  {
    name: "Formal Blazer",
    subtitle: "Men's Formal",
    price: "$89.90",
    description: "Elegant formal blazer tailored for office and special occasions.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    sizes: ["M", "L", "XL"],
    material: "Wool Blend",
    colors: ["#1f2937", "#374151"],
  },
  {
    name: "Kids Outfit",
    subtitle: "Kids",
    price: "$29.50",
    description: "Cute and comfy kids outfit perfect for daily wear.",
    img: "https://images.unsplash.com/photo-1603252109234-d84bb2bbec3d?q=80&w=1200&auto=format&fit=crop",
    sizes: ["XS", "S", "M"],
    material: "Cotton",
    colors: ["#fbbf24", "#f472b6"],
  },
  {
    name: "Leather Boots",
    subtitle: "Men's Footwear",
    price: "$120.00",
    description: "Durable leather boots perfect for casual or rugged wear.",
    img: "https://images.unsplash.com/photo-1600185360703-cd963bbd82f4?q=80&w=1200&auto=format&fit=crop",
    sizes: ["8", "9", "10", "11"],
    material: "Leather",
    colors: ["#1f2937", "#4b5563"],
  },
  {
    name: "Pleated Skirt",
    subtitle: "Women's Fashion",
    price: "$49.99",
    description: "Elegant pleated skirt suitable for casual and semi-formal outings.",
    img: "https://images.unsplash.com/photo-1600185360712-5e7f5e6a3173?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Polyester",
    colors: ["#f472b6", "#60a5fa"],
  },
  {
    name: "Running Shoes",
    subtitle: "Unisex Sportswear",
    price: "$75.00",
    description: "Lightweight and breathable running shoes for all-day comfort.",
    img: "https://images.unsplash.com/photo-1595950653860-3a2aa2a9c0e6?q=80&w=1200&auto=format&fit=crop",
    sizes: ["6", "7", "8", "9", "10"],
    material: "Mesh & Rubber",
    colors: ["#10b981", "#f87171", "#60a5fa"],
  },
  {
    name: "Winter Coat",
    subtitle: "Men's Outerwear",
    price: "$150.00",
    description: "Warm winter coat with insulated lining for extreme cold weather.",
    img: "https://images.unsplash.com/photo-1600185360708-1b94b5bb42f5?q=80&w=1200&auto=format&fit=crop",
    sizes: ["M", "L", "XL", "XXL"],
    material: "Wool Blend",
    colors: ["#1f2937", "#4b5563"],
  },
  {
    name: "Graphic Tee",
    subtitle: "Unisex Casual",
    price: "$22.00",
    description: "Stylish graphic t-shirt made from soft cotton for everyday wear.",
    img: "https://images.unsplash.com/photo-1600185360724-0c2aa3e5e4c2?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    material: "Cotton",
    colors: ["#fbbf24", "#f87171", "#60a5fa"],
  },
  {
    name: "Kids Sneakers",
    subtitle: "Kids Footwear",
    price: "$35.00",
    description: "Comfortable sneakers for kids with easy-to-wear Velcro straps.",
    img: "https://images.unsplash.com/photo-1600185360715-52b1e8b3a567?q=80&w=1200&auto=format&fit=crop",
    sizes: ["XS", "S", "M"],
    material: "Synthetic",
    colors: ["#f472b6", "#60a5fa", "#10b981"],
  },
  {
    name: "Evening Gown",
    subtitle: "Women's Fashion",
    price: "$199.00",
    description: "Elegant evening gown perfect for formal events and parties.",
    img: "https://images.unsplash.com/photo-1600185360730-7b5aa2b9e5c1?q=80&w=1200&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    material: "Silk",
    colors: ["#f472b6", "#fbbf24"],
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

  const handleAddToCart = (item) => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color!");
      return;
    }
    const cartItem = { ...item, selectedSize, selectedColor };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col justify-between">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate("/products1")}
          className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          <FaBackward className="text-xl" />
        </button>
      </div>

      {/* Hero */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 drop-shadow-lg">
          Fashion Collection
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Trendy, stylish, and comfortable clothes for everyone ✨
        </p>
      </section>

      {/* Search & Categories */}
  {!selectedItem && (
  <div className="mt-1 max-w-6xl mx-auto px-7 flex flex-col gap-7 mt-1">
    {/* First Line: Search Bar */}
    <div className="w-full rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-lg p-1 flex gap-2">
      <input
        type="text"
        placeholder="Search for clothes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-4 py-3 rounded-2xl bg-transparent placeholder-gray-400 text-gray-800 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
      />
      <button className="px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all">
        Search
      </button>
    </div>

    {/* Second Line: Category Buttons */}
    <div className="flex flex-wrap justify-center gap-3 mt-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilterCategory(cat)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            filterCategory === cat
              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-purple-500 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
)}


      {/* Clothes Grid / Details */}
      <section className="mx-auto max-w-6xl px-6 flex-grow mb-12">
        {!selectedItem ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClothes.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedSize("");
                  setSelectedColor("");
                }}
                className="cursor-pointer group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                  <span className="mt-2 block text-purple-700 font-semibold text-lg">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Selected Item Details
          <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 text-center transition-all duration-500">
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-full h-80 object-cover rounded-2xl mb-6 shadow-lg"
            />
            <h2 className="text-4xl font-bold text-purple-700">{selectedItem.name}</h2>
            <p className="text-gray-500 mt-2">{selectedItem.subtitle}</p>
            <p className="mt-4 text-gray-600 text-lg">{selectedItem.description}</p>
            <p className="mt-4 text-2xl font-bold text-indigo-600">{selectedItem.price}</p>
            <p className="mt-2 text-sm text-gray-500">Material: {selectedItem.material}</p>

            {/* Sizes */}
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              {selectedItem.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 rounded-full border-2 font-semibold ${
                    selectedSize === size
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-purple-500 hover:text-white"
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Colors */}
            <div className="mt-4 flex justify-center gap-3">
              {selectedItem.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex justify-center gap-6">
              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300 hover:scale-105 transition"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold">FashionHub</h2>
            <p className="mt-2 text-sm text-purple-100">
              Your one-stop destination for trendy fashion 👗👕✨
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-yellow-200">Home</a></li>
              <li><a href="/products1" className="hover:text-yellow-200">Products</a></li>
              <li><a href="/cart" className="hover:text-yellow-200">Cart</a></li>
              <li><a href="/profile" className="hover:text-yellow-200">Profile</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-xl">
              <a href="#" className="hover:text-yellow-200"><FaFacebook /></a>
              <a href="#" className="hover:text-yellow-200"><FaTwitter /></a>
              <a href="#" className="hover:text-yellow-200"><FaInstagram /></a>
              <a href="#" className="hover:text-yellow-200"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-purple-100 mt-8 border-t border-purple-400 pt-4">
          © {new Date().getFullYear()} FashionHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default ClothesPage;
