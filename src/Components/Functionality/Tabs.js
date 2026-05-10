import React, { useState } from "react";
import Link from "./Link";
import QrCode from "./QrCode";
import { FiLink} from "react-icons/fi";
import { FaQrcode } from "react-icons/fa6";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Link");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Header */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-md p-1 gap-1">
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "Link"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => toggleTab("Link")}
            >
              <FiLink className={`text-lg ${activeTab === "Link" ? "text-white" : ""}`} />
              <span>Shorten URL</span>
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "QrCode"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => toggleTab("QrCode")}
            >
              <FaQrcode className={`text-lg ${activeTab === "QrCode" ? "text-white" : ""}`} />
              <span>Generate QR Code</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 animate-fadeIn">
          {activeTab === "Link" && (
            <div className="transition-all duration-300 transform">
              <Link />
            </div>
          )}
          {activeTab === "QrCode" && (
            <div className="transition-all duration-300 transform">
              <QrCode />
            </div>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Tabs;