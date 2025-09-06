import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import './dashboard.css';

import img1 from '../assets/pic1.jpg';
import img2 from '../assets/pic2.jpg';
import img3 from '../assets/pic3.jpg';
import img4 from '../assets/pic4.jpg';
import img5 from '../assets/pic5.jpg';
import img6 from '../assets/pic6.jpg';

function Dashboard() {
  const imagePairs = [
    { images: [img1, img2], title: "New Arrivals", desc: "Check out our fresh collections this season." },
    { images: [img3, img4], title: "Best Sellers", desc: "Our most loved products, handpicked for you." },
    { images: [img5, img6], title: "Special Offers", desc: "Exclusive deals you don’t want to miss!" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [imagePairs.length]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Profile Icon */}
      <div className="flex justify-end p-4 sm:p-6">
        <Link 
          to="/profile" 
          className="text-3xl sm:text-4xl text-purple-600 hover:text-pink-500 transition-transform hover:scale-110"
        >
          <CgProfile />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center flex-1 justify-center px-4 sm:px-6 lg:px-12">
        
        {/* Title Card */}
        <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-2xl p-6 sm:p-10 mb-8 sm:mb-10 w-full max-w-xl md:max-w-2xl text-center transition transform hover:scale-105 duration-500">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-700 mb-2 sm:mb-3 drop-shadow-lg tracking-wide">
            {imagePairs[currentIndex].title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {imagePairs[currentIndex].desc}
          </p>
        </div>

        {/* Image Grid */}
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-lg md:max-w-2xl lg:max-w-3xl transition transform hover:shadow-2xl duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {imagePairs[currentIndex].images.map((img, i) => (
              <div 
                key={i} 
                className="relative group overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="rounded-xl object-cover h-40 sm:h-48 md:h-56 w-full transform transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-3 sm:space-x-4">
            {imagePairs.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 border-purple-500 transition-all duration-500 
                  ${index === currentIndex 
                    ? 'bg-purple-600 scale-110 sm:scale-125 shadow-lg' 
                    : 'bg-white hover:bg-purple-200'}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 sm:py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-semibold shadow-inner">
        <p className="text-sm sm:text-base lg:text-lg tracking-wide">&copy; 2025 RK Stores (Pvt) Ltd</p>
      </footer>
    </div>
  );
}

export default Dashboard;
