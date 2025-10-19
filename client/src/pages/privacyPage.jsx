import React from "react";
import { ArrowLeft, Shield, Lock, Eye, Users, Mail, Cookie, FileText } from "lucide-react";

function PrivacyPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Introduction",
      content: "Welcome to our store! Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make purchases on our platform."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information We Collect",
      items: [
        "Personal Information: Name, email, phone number, shipping address, payment details",
        "Order Information: Items purchased, quantity, prices, payment status",
        "Technical Information: IP address, browser type, device information, and cookies",
        "Communication: Messages, feedback, and customer service interactions"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      items: [
        "Order Processing: To deliver the items you purchase",
        "Payment Processing: To securely process payments",
        "Customer Support: To respond to inquiries or issues",
        "Marketing (Optional): To send promotional emails, if you opted in",
        "Improvement: To enhance our website and services"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Information",
      content: "We take security seriously and use measures such as secure servers, encrypted payment gateways (SSL/HTTPS), restricted access to personal information, and regular security monitoring."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: "We do not sell your personal data. We may share information with:",
      items: [
        "Payment processors to complete transactions",
        "Delivery services to ship your orders",
        "Legal authorities if required by law"
      ]
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: "We use cookies and similar technologies to improve your shopping experience, remember your cart items and preferences, and analyze website traffic. You can disable cookies in your browser, but some features may not work properly."
    }
  ];

  const handleBackClick = () => {
    window.location.href = '/products1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Effective Date: January 1, 2024
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 mb-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {section.content}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Additional Sections */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You can request access to your personal data, request correction or deletion of your data, and opt-out of marketing emails at any time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our store is not directed at children under 13, and we do not knowingly collect personal information from children.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. The latest version will be posted on our platform with an updated effective date.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 sm:p-10 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="text-indigo-100 mb-4">
                If you have questions about your privacy, we're here to help.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-indigo-200 mb-1">Email</p>
              <p className="font-medium">ravindukalhara22520@gmail.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-indigo-200 mb-1">Phone</p>
              <p className="font-medium">(+94) 772211681</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-indigo-200 mb-1">Address</p>
              <p className="font-medium">576/C , Bataduwa , Galle .</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          © 2025 Your Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;