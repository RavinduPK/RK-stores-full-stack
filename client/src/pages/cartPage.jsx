import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handlePurchase = (item) => {
    // Navigate to PurchasePage and pass item details
    navigate("/purchase", { state: { item } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 transition hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-48 w-48 object-cover rounded-xl"
              />

              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-500">{item.subtitle}</p>
                <p className="text-sm text-gray-600">Material: {item.material}</p>
                <p className="text-sm text-gray-600">
                  Size: <span className="font-semibold">{item.selectedSize}</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Color:</span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: item.selectedColor }}
                  />
                </div>

                <p className="text-purple-600 font-bold text-lg mt-2">{item.price}</p>

                <div className="mt-4 flex gap-3 flex-wrap">
                  <button
                    onClick={() => handleRemove(index)}
                    className="px-5 py-2 bg-red-500 text-white rounded-full shadow hover:scale-105 transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handlePurchase(item)}
                    className="px-5 py-2 bg-green-500 text-white rounded-full shadow hover:scale-105 transition"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/clothes")}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-full shadow hover:scale-105 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartPage;
