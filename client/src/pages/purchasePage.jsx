import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Truck,
  Mail,
  User,
  Calendar,
  Hash,
} from "lucide-react";

function PurchasePage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load data from CartPage
    if (window.checkoutData) {
      setCartItems(window.checkoutData.cartItems);
      setSubtotal(window.checkoutData.subtotal);
      setSavings(window.checkoutData.savings);
      setShipping(window.checkoutData.shipping);
      setTax(window.checkoutData.tax);
      setTotal(window.checkoutData.total);
    } 
  }, []);

  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ");
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Name is required";
    if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Invalid card number";
    if (!formData.expiry || formData.expiry.length < 5) newErrors.expiry = "Invalid expiry date";
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setLoading(true);
    setCurrentStep(2);

    setTimeout(() => {
      setCurrentStep(3);
      setLoading(false);
    }, 2500);
  };

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait while we securely process your transaction...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been confirmed and will be shipped soon.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="text-3xl font-bold text-gray-800">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="flex items-center text-gray-600 hover:text-gray-800 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Cart</span>
          </button>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h1>

              {/* Security Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">256-bit SSL Encryption</h3>
                  <p className="text-sm text-blue-700">Your payment information is fully encrypted and secure.</p>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg transition ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : focusedField === "email"
                        ? "border-indigo-500 bg-white"
                        : "border-gray-300 bg-white"
                    } focus:outline-none`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Cardholder Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                    onFocus={() => setFocusedField("cardholderName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg transition ${
                      errors.cardholderName
                        ? "border-red-300 bg-red-50"
                        : focusedField === "cardholderName"
                        ? "border-indigo-500 bg-white"
                        : "border-gray-300 bg-white"
                    } focus:outline-none`}
                  />
                </div>
                {errors.cardholderName && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Card Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                    onFocus={() => setFocusedField("cardNumber")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg transition ${
                      errors.cardNumber
                        ? "border-red-300 bg-red-50"
                        : focusedField === "cardNumber"
                        ? "border-indigo-500 bg-white"
                        : "border-gray-300 bg-white"
                    } focus:outline-none`}
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange("expiry", formatExpiry(e.target.value))}
                      onFocus={() => setFocusedField("expiry")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg transition ${
                        errors.expiry
                          ? "border-red-300 bg-red-50"
                          : focusedField === "expiry"
                          ? "border-indigo-500 bg-white"
                          : "border-gray-300 bg-white"
                      } focus:outline-none`}
                    />
                  </div>
                  {errors.expiry && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.expiry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                      onFocus={() => setFocusedField("cvv")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="123"
                      maxLength="4"
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg transition ${
                        errors.cvv
                          ? "border-red-300 bg-red-50"
                          : focusedField === "cvv"
                          ? "border-indigo-500 bg-white"
                          : "border-gray-300 bg-white"
                      } focus:outline-none`}
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start">
                <Truck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Free Shipping</p>
                  <p className="text-xs text-green-700">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;