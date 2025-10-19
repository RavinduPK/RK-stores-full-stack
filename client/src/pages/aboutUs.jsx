import React from "react";
import { ArrowLeft, Target, Eye, Heart, Shield, Lightbulb, Leaf, ShoppingBag, Star, Users } from "lucide-react";

function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Satisfaction",
      description: "We put our customers first in every decision we make"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality",
      description: "We only offer products that meet our high standards"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "We operate honestly and transparently with everyone"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "We strive to improve and offer better experiences"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Responsibility",
      description: "We care deeply about our community and environment"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "5K+", label: "Products" },
    { number: "50+", label: "Categories" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const handleBackClick = () => {
    window.location.href = '/products1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            About RK Stores
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted online destination for quality products delivered right to your door
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100"
            >
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 sm:p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to RK Stores, where shopping meets convenience and quality. Our mission is to make shopping easy, convenient, and enjoyable for everyone.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We offer a wide range of products to meet your daily needs, from groceries to household essentials. Each item is carefully selected to ensure the highest quality and best value for our customers.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-lg p-8 sm:p-10 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-purple-50 leading-relaxed">
                To become the most reliable online store where customers can shop confidently and find everything they need in one place.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 sm:p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional service, quality products, and a seamless shopping experience that exceeds customer expectations every single time.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to you
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-purple-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Thank You for Choosing RK Stores
          </h2>
          <p className="text-purple-50 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            We are committed to providing you with the best online shopping experience. Your trust and satisfaction drive us to continuously improve and serve you better every day.
          </p>
          <button
            onClick={handleBackClick}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          © 2024 RK Stores. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default AboutPage;