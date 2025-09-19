import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

const categories = [
  { name: "Foods", image: "https://www.precisionorthomd.com/wp-content/uploads/2023/10/percision-blog-header-junk-food-102323.jpg", link: "/foods" },
  { name: "Drinks", image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-802667754.jpg?c=16x9&q=h_833,w_1480,c_fill", link: "/drinks" },
  { name: "Clothes", image: "https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg", link: "/clothes" },
  { name: "Electric Items", image: "https://media.istockphoto.com/id/1174598609/photo/set-of-contemporary-house-appliances-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bBMILbCpLkhIxbL7sAAXaFOaFaSXFCt80ccHgl7iiWM=", link: "/electronics" },
  { name: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", link: "/books" },
  { name: "Mobiles", image: "https://www.dennemeyer.com/fileadmin/a/blog/Everyday_IP_Spreading_the_word_about_mobile_phones/Everyday-IP_Spreading-the-word-about-mobile-phones_12.jpg", link: "/mobiles" },
  { name: "Kitchen Items", image: "https://t3.ftcdn.net/jpg/00/63/25/12/360_F_63251258_XMxdxQWrRiv3eY4VatQY5iDwV7lrOiPm.jpg", link: "/kitchen-items" },
  { name: "Toys", image: "https://www.yorwaste.co.uk/wp-content/uploads/2024/08/shutterstock_436617280-scaled-optimised.jpg", link: "/toys" },
  { name: "Furniture", image: "https://i.pinimg.com/564x/5f/c7/6d/5fc76df6bda7762fe219ed48a724e69d.jpg", link: "/furniture" },
  { name: "Tool Kit", image: "https://hi-spec.com/cdn/shop/articles/aeqkmval_800x800.png?v=1719995369", link: "/tool-kit" },
  { name: "Gift Item", image: "https://images.squarespace-cdn.com/content/v1/6100ae408f395b33971e81aa/1732746095209-H6CXXFLL7W7AZKZDUAWI/Cordner+Advisory+Img+3+%27When+a+Gift+is+Not+a+Gift%27.jpg", link: "/gift-item" },
  { name: "Flowers", image: "https://www.madlen.pl/wp-content/uploads/IMG_2618-scaled.jpeg", link: "/flowers" }
];

function StorePage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <Navbar />

      {/* Cart Icon Top Right */}
      <div className="fixed top-21 right-2 z-20">
        <button
          onClick={() => navigate("/cart")}
          className="relative text-2xl p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition"
        >
          <IoCartOutline />
          {cartCount > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <h1 className="text-5xl font-extrabold text-center mt-14 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 drop-shadow-lg py-2">
        Store Categories
      </h1>

      {/* Categories Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8 mt-16">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-purple-900/70 group-hover:via-pink-700/30 group-hover:to-transparent transition-all duration-500"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4 py-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30">
              <h2 className="text-2xl font-bold text-white drop-shadow-md group-hover:text-yellow-300 transition duration-300">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-12 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center font-semibold shadow-inner py-4">
        <p>&copy; 2025 RK Stores (Pvt) Ltd</p>
      </footer>
    </div>
  );
}

export default StorePage;
