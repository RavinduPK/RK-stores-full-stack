import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import picture from "../assets/pic1.jpg";

function Dashboard() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Enhanced images with better descriptions
  const imagePairs = [
    { 
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 
               'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800'], 
      title: "New Arrivals", 
      desc: "Discover cutting-edge collections designed for tomorrow's lifestyle",
      badge: "NEW",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      accent: "cyan"
    },
    { 
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', 
               'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'], 
      title: "Best Sellers", 
      desc: "Premium selection loved by thousands of satisfied customers worldwide",
      badge: "🔥 HOT",
      color: "from-orange-400 via-red-500 to-pink-600",
      accent: "orange"
    },
    { 
      images: ['https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800', 
               'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800'], 
      title: "Special Offers", 
      desc: "Exclusive deals and limited-time offers crafted just for you",
      badge: "50% OFF",
      color: "from-purple-400 via-violet-500 to-indigo-600",
      accent: "purple"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
    }, 5000); // Slightly longer for better UX
    
    return () => clearInterval(interval);
  }, [imagePairs.length, isAutoPlaying]);

  const goToImage = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? imagePairs.length - 1 : prevIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      
      {/* Enhanced Navigation Bar */}
      <nav className="backdrop-blur-2xl bg-white/70 border-b border-white/30 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-black text-lg">RK</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-sm"></div>
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  RK Stores
                </span>
                <div className="text-xs text-blue-600 font-medium">Premium Collection</div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/profile'}
                className="relative group p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                <CgProfile className="w-6 h-6" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => window.location.href = '/login'}
                className="relative group p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                <MdLogout className="w-6 h-6" />
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Enhanced Left Column */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* Smart Badge */}
                <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${imagePairs[currentIndex].color} animate-pulse shadow-sm`}></div>
                  <span className="text-gray-800 font-semibold">{imagePairs[currentIndex].badge}</span>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <span className="text-sm text-gray-600">Limited Time</span>
                </div>
                
                {/* Enhanced Title */}
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                  <span className={`bg-gradient-to-r ${imagePairs[currentIndex].color} bg-clip-text text-transparent transition-all duration-1000 drop-shadow-sm`}>
                    {imagePairs[currentIndex].title}
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                  {imagePairs[currentIndex].desc}
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button className={`group relative px-10 py-5 bg-gradient-to-r ${imagePairs[currentIndex].color} text-white rounded-3xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-3 overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                  <span className="relative z-10">Shop Now</span>
                  <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
                
                <button
                  className="px-10 py-5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-3xl font-bold border border-white/60 hover:bg-white hover:border-gray-200 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = '/products1'}
                >
                  View Collection
                </button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                {[
                  { value: '500+', label: 'Products', icon: '📦' },
                  { value: '50k+', label: 'Customers', icon: '👥' },
                  { value: '4.9', label: 'Rating', icon: '⭐' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Right Column - Image Carousel */}
            <div className="relative">
              <div className="relative bg-white/40 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50">
                
                {/* Enhanced Navigation Arrows */}
                <button 
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/60"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/60"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Enhanced Image Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {imagePairs[currentIndex].images.map((img, i) => (
                    <div 
                      key={i} 
                      className="relative group overflow-hidden rounded-3xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-700"
                    >
                      <img
                        src={img}
                        alt={`${imagePairs[currentIndex].title} ${i + 1}`}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${imagePairs[currentIndex].color} opacity-0 group-hover:opacity-30 transition-all duration-700`}></div>
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-sm font-semibold text-gray-800">Premium Quality</div>
                        <div className="text-xs text-gray-600">Handpicked Selection</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Dots Navigation */}
                <div className="flex justify-center space-x-3">
                  {imagePairs.map((_, index) => (
                    <button
                      key={index}
                      className={`relative transition-all duration-500 ${
                        index === currentIndex 
                          ? `w-12 h-4 bg-gradient-to-r ${imagePairs[currentIndex].color} rounded-full shadow-lg` 
                          : 'w-4 h-4 bg-white/70 hover:bg-white/90 rounded-full shadow-md hover:shadow-lg hover:scale-110'
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r ${imagePairs[currentIndex].color} rounded-full opacity-20 animate-pulse blur-xl`}></div>
              <div className={`absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-r ${imagePairs[currentIndex].color} rounded-full opacity-10 animate-pulse blur-2xl`} style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced About Section with Modern Flip Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-blue-700 font-semibold text-sm">About Our Company</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">RK Stores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our journey, vision, and achievements that define who we are and why we're trusted by thousands
            </p>
          </div>

          {/* Enhanced Flip Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Enhanced Progress Card */}
            <div className="group relative h-96 [perspective:1000px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Enhanced Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200/50 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl opacity-20 blur-xl"></div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">Our Progress</h3>
                  <p className="text-blue-600 font-semibold text-center">Growing Every Day</p>
                  <div className="mt-4 text-sm text-gray-500 text-center">Hover to see details</div>
                </div>

                {/* Enhanced Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8 text-white shadow-2xl">
                  <div className="space-y-6">
                    {[
                      { year: "2019", desc: "Company Founded", icon: "🚀" },
                      { year: "500+", desc: "Products Added", icon: "📦" },
                      { year: "50k+", desc: "Happy Customers", icon: "😊" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <div className="text-2xl font-black">{item.year}</div>
                          <div className="text-blue-100 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Vision Card */}
            <div className="group relative h-96 [perspective:1000px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 border border-indigo-200/50 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-20 blur-xl"></div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">Our Vision</h3>
                  <p className="text-indigo-600 font-semibold text-center">Future Forward</p>
                  <div className="mt-4 text-sm text-gray-500 text-center">Hover to see details</div>
                </div>

                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6 text-white shadow-2xl">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">🌟</div>
                    <p className="text-xl font-bold mb-4">Leading Innovation</p>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      To be the most trusted and innovative retail destination, transforming shopping experiences through technology and exceptional service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced History Card */}
            <div className="group relative h-96 [perspective:1000px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-100 border border-purple-200/50 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl opacity-20 blur-xl"></div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">Our History</h3>
                  <p className="text-purple-600 font-semibold text-center">Journey of Excellence</p>
                  <div className="mt-4 text-sm text-gray-500 text-center">Hover to see timeline</div>
                </div>

                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-purple-600 to-pink-700 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6 text-white shadow-2xl">
                  <div className="space-y-4 text-sm">
                    {[
                      { year: "2019", event: "Company Founded", icon: "🎯" },
                      { year: "2020", event: "Online Platform Launch", icon: "🚀" },
                      { year: "2022", event: "Mobile App Released", icon: "📱" },
                      { year: "2025", event: "Market Leader", icon: "👑" }
                    ].map((milestone, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="text-lg">{milestone.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{milestone.year}</div>
                          <div className="text-purple-100 text-xs">{milestone.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Achievement Card */}
            <div className="group relative h-96 [perspective:1000px]">
              
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-100 border border-amber-200/50 [backface-visibility:hidden] flex flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl opacity-20 blur-xl"></div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">Achievements</h3>
                  <p className="text-amber-600 font-semibold text-center">Awards & Recognition</p>
                  <div className="mt-4 text-sm text-gray-500 text-center">Hover to see awards</div>
                </div>

                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-black to-black-700 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6 text-white shadow-2xl">
                  <div className="space-y-6 text-center">
                    {[
                      { icon: "🏆", title: "Best E-commerce 2024", desc: "Industry Leader Award" },
                      { icon: "⭐", title: "4.9/5 Rating", desc: "Customer Satisfaction" },
                      { icon: "🎯", title: "50k+ Customers", desc: "Trust & Growth" }
                    ].map((achievement, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <div className="font-bold text-base mb-1">{achievement.title}</div>
                        <div className="text-amber-100 text-xs">{achievement.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Fixed Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Why We're <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of shopping with our innovative features and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Ultra-fast loading and seamless shopping experience",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: "🔒",
                title: "Secure & Safe",
                desc: "Advanced encryption and secure payment processing",
                color: "from-green-400 to-teal-500"
              },
              {
                icon: "🎯",
                title: "Personalized",
                desc: "AI-powered recommendations tailored just for you",
                color: "from-purple-400 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Shopping Journey?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers and discover why RK Stores is the premium choice for modern shopping
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
            onClick={() => {
              window.location.href = '/products1';
            }}
            className="group relative px-12 py-5 bg-white text-blue-600 rounded-full font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10">Get Started Now</span>
            </button>
            
            <button 
            onClick={() => {
              window.location.href = 'https://www.google.com/search?q=rk+stores&oq=rk+stores&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyBwgBEAAYgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyDQgHEC4YrwEYxwEYgAQyBwgIEAAYgAQyBwgJEAAYgATSAQkzNzAxajBqMTWoAgiwAgHxBfB8so4RpHFb&sourceid=chrome&ie=UTF-8';
              {/* open in new tab */}
              target_blank = "_blank";
            }}
            className="group px-12 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
              Learn More
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-16 opacity-80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200">Support</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-sm text-blue-200">Shipping</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">30-Day</div>
              <div className="text-sm text-blue-200">Returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            
            {/* Enhanced Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">RK</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-sm"></div>
                </div>
                <div>
                  <span className="text-2xl font-black">RK Stores</span>
                  <div className="text-sm text-gray-400">Premium Collection</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Transforming the way you shop with innovative technology, premium products, and exceptional customer service since 2019.
              </p>
              <div className="flex space-x-4">
                {['F', 'T', 'I', 'L'].map((social, index) => (
                  <button key={index} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-sm font-bold">{social}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'Products', 'About', 'Contact'].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Support</h3>
              <div className="space-y-3">
                {['Help Center', 'Shipping Info', 'Returns', 'Size Guide'].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">&copy; 2025 RK Stores (Pvt) Ltd. All rights reserved.</p>
              <p className="text-sm text-gray-500 mt-1">Crafting experiences, delivering excellence</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button 
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>
    </div>
  );
}

export default Dashboard;