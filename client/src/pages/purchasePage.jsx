import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-gray-500">No item selected. Go back to cart.</p>
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:scale-105 transition"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    // Here you can integrate payment gateway like Stripe or just simulate
    alert(`Payment successful for ${item.name} of ${item.price}`);
    navigate("/clothes"); // Redirect after payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8">Purchase</h1>

      {/* Item Details */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mb-8 text-center">
        <img
          src={item.img}
          alt={item.name}
          className="h-64 w-full object-cover rounded-2xl mb-6"
        />
        <h2 className="text-2xl font-bold text-purple-700">{item.name}</h2>
        <p className="text-gray-500">{item.subtitle}</p>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-2 text-indigo-600 font-bold text-xl">{item.price}</p>
        <p className="mt-2 text-sm text-gray-500">Material: {item.material}</p>
        <p className="mt-2 text-sm text-gray-500">
          Size: <span className="font-semibold">{item.selectedSize}</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Color: <span className="inline-block w-6 h-6 rounded-full" style={{ backgroundColor: item.selectedColor }}></span>
        </p>
      </div>

      {/* Payment Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Payment Details</h3>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <input
            type="text"
            placeholder="Card Number (xxxx-xxxx-xxxx-xxxx)"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-24 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Card Icons */}
          <div className="flex items-center gap-4 mt-2">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8"/>
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="h-8"/>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Pay {item.price}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
