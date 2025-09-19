import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";

function Dashboard() {
  const navigate = useNavigate();

  // Mock images - replace with your actual images
  const imagePairs = [
    { 
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600', 
               'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600'], 
      title: "New Arrivals", 
      desc: "Discover fresh collections crafted for the modern lifestyle",
      badge: "NEW",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600', 
               'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600'], 
      title: "Best Sellers", 
      desc: "Customer favorites that define quality and style",
      badge: "HOT",
      color: "from-orange-500 to-red-500"
    },
    { 
      images: ['https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600', 
               'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'], 
      title: "Special Offers", 
      desc: "Limited-time deals designed just for you",
      badge: "50% OFF",
      color: "from-purple-500 to-pink-500"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [imagePairs.length, isAutoPlaying]);

  const goToImage = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? imagePairs.length - 1 : prevIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
     <nav className="backdrop-blur-xl bg-white/80 border-b border-white/20 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">RK</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          RK Stores
        </span>
      </div>

      <div className="flex"></div>
      <div className="flex">
  {/* Profile Button */}
  <button
    onClick={() => window.location.href = '/profile'}
    className="relative group p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mr-4"
  >
    <CgProfile className="w-6 h-6" />
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
  </button>

  {/* Logout Button */}
  <button
    onClick={() => window.location.href = '/login'}
    className="relative group p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    <MdLogout className="w-6 h-6" />
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
  </button>
</div>

    </div>
  </div>
</nav>


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${imagePairs[currentIndex].color} animate-pulse`}></span>
                  <span>{imagePairs[currentIndex].badge}</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                  <span className={`bg-gradient-to-r ${imagePairs[currentIndex].color} bg-clip-text text-transparent transition-all duration-700`}>
                    {imagePairs[currentIndex].title}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  {imagePairs[currentIndex].desc}
                </p>
              </div>

            
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`group px-8 py-4 bg-gradient-to-r ${imagePairs[currentIndex].color} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}>
                  <span>Shop Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button
                  className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/products1'}
                >
                  View Collection
                </button>
              </div>

             
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50k+</div>
                  <div className="text-sm text-gray-600">Customers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-2xl font-bold text-gray-900">4.9</span>
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="relative">
              <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                
                {/* Navigation Arrows */}
                <button 
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                >
                  <span className="w-5 h-5 text-gray-700 flex items-center justify-center">‹</span>
                </button>
                
                <button 
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                >
                  <span className="w-5 h-5 text-gray-700 flex items-center justify-center">›</span>
                </button>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {imagePairs[currentIndex].images.map((img, i) => (
                    <div 
                      key={i} 
                      className="relative group overflow-hidden rounded-2xl aspect-square"
                    >
                      <img
                        src={img}
                        alt={`${imagePairs[currentIndex].title} ${i + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${imagePairs[currentIndex].color} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
                    </div>
                  ))}
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center space-x-2">
                  {imagePairs.map((_, index) => (
                    <button
                      key={index}
                      className={`relative h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-600' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r ${imagePairs[currentIndex].color} rounded-full opacity-20 animate-pulse`}></div>
              <div className={`absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r ${imagePairs[currentIndex].color} rounded-full opacity-10 animate-pulse`} style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RK</span>
              </div>
              <span className="text-xl font-bold">RK Stores</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">&copy; 2025 RK Stores (Pvt) Ltd</p>
              <p className="text-sm text-gray-500">Crafting experiences, delivering excellence</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;