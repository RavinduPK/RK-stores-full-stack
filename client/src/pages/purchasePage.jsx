import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Star,
  Truck,
  Calendar,
  User,
  Hash,
  Tag
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function PurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  // ---------------- STATE ----------------
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

  // ---------------- HANDLERS ----------------
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Name is required";
    if (!formData.cardNumber.replace(/\s/g, "")) newErrors.cardNumber = "Card number is required";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (!formData.email) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setCurrentStep(2);

    // simulate payment
    setTimeout(() => {
      setCurrentStep(3);
      setLoading(false);
    }, 3000);
  };

  // ---------------- CONDITIONAL RENDERS ----------------
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-indigo-900 mb-2">No Item Selected</h2>
          <p className="text-indigo-600/70 mb-6">Please go back to your cart to select an item.</p>
          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50 p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-indigo-200/50 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h2>
          <p className="text-indigo-700 mb-2">
            Your order for <span className="font-semibold">{item.name}</span> has been confirmed.
          </p>
          <p className="text-indigo-600/70 mb-8">
            You'll receive a confirmation email shortly.
          </p>
          <button
            onClick={() => navigate("/products1")}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-indigo-200/50 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Processing Payment</h2>
          <p className="text-indigo-600/70 mb-6">
            Please wait while we securely process your payment...
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secure Transaction</span>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- MAIN CHECKOUT PAGE ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-indigo-100/50 shadow-lg shadow-indigo-100/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Secure Checkout
              </h1>
              <p className="text-sm text-indigo-600/70">Complete your purchase securely</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">256-bit SSL</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Left: Product Summary */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 p-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Order Summary</h2>
          <div className="flex gap-6 mb-6">
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900">{item.name}</h3>
              <p className="text-indigo-600/70">{item.subtitle}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm text-indigo-700 font-medium">{item.rating}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-indigo-200">
            <div className="flex justify-between text-indigo-700">
              <span>Subtotal</span>
              <span className="font-semibold">${item.price}</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" /> Shipping
              </span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span>Tax</span>
              <span className="font-semibold">${(item.price * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-indigo-200 pt-4">
              <div className="flex justify-between text-xl font-bold text-indigo-900">
                <span>Total</span>
                <span>${(item.price + item.price * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-indigo-900">Payment Details</h2>
          </div>

          {/* Contact */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              className={`w-full px-4 py-3 bg-indigo-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${errors.cardholderName ? "border-red-400" : "border-indigo-200"}`}
            />
            {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 bg-indigo-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-400" : "border-indigo-200"}`}
            />
          </div>

          {/* Card Info */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              maxLength="19"
              className={`w-full px-4 py-3 bg-indigo-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${errors.cardNumber ? "border-red-400" : "border-indigo-200"}`}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                maxLength="5"
                className={`w-full px-4 py-3 bg-indigo-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${errors.expiry ? "border-red-400" : "border-indigo-200"}`}
              />
              <input
                type="text"
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength="4"
                className={`w-full px-4 py-3 bg-indigo-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${errors.cvv ? "border-red-400" : "border-indigo-200"}`}
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay $${(item.price + item.price * 0.08).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
