import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, CreditCard, Plus, Minus, Heart, ShoppingBag, Star, Shield, Truck, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set([2]));
  const [showCheckout, setShowCheckout] = useState(false);

  // Load cart items from localStorage when page loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("/cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Remove item from cart
  const handleRemove = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("/cart", JSON.stringify(updatedCart));
  };

  // Change quantity of an item
  const handleQuantityChange = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("/cart", JSON.stringify(updatedCart));
  };

  // Toggle favorite status
  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const handlePurchase = (item) => {
    console.log("Navigate to purchase:", item);
  };

  const continueShopping = () => {
    navigate("/products1");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    const originalTotal = (item.originalPrice || item.price) * item.quantity;
    const currentTotal = item.price * item.quantity;
    return sum + (originalTotal - currentTotal);
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Shopping Cart</h1>
              <p className="text-sm text-indigo-600/70">{cartItems.length} items</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-indigo-200/50 text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Your cart is empty</h2>
            <p className="text-indigo-600/70 mb-8">Discover amazing products and start shopping!</p>
            <button
              onClick={continueShopping}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100/50 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-xl shadow-md"
                        />
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-rose-500 text-rose-500' : 'text-indigo-600'}`}
                          />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-indigo-900">{item.name}</h3>
                          <p className="text-indigo-600/70">{item.subtitle}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-indigo-700 font-medium">{item.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-indigo-600/70">
                          <span className="bg-indigo-50 px-2 py-1 rounded-lg">Material: {item.material}</span>
                          <span className="bg-indigo-50 px-2 py-1 rounded-lg">Size: {item.selectedSize}</span>
                          <div className="flex items-center gap-2 bg-indigo-50 px-2 py-1 rounded-lg">
                            <span>Color:</span>
                            <div
                              className="w-4 h-4 rounded-full border border-indigo-200"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-lg text-red-400 line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-indigo-50 rounded-xl">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-l-xl transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-indigo-900 font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-r-xl transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                          <button
                            onClick={() => handlePurchase(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 rounded-xl transition-all"
                          >
                            <CreditCard className="w-4 h-4" />
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-indigo-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-indigo-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        You saved
                      </span>
                      <span className="font-semibold">-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-indigo-700">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-indigo-700">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-indigo-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-indigo-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Banner */}
                {subtotal < 100 && (
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-6">
                    <p className="text-orange-700 text-sm text-center">
                      Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more for free shipping!
                    </p>
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Fast Ship</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <button
                  onClick={continueShopping}
                  className="w-full mt-3 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
