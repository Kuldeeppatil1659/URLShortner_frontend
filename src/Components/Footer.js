import React from "react";
import { FiMail, FiGithub, FiHeart } from "react-icons/fi";
import { FaWhatsapp, FaPortrait } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-white"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Linklyfy. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {/* Portfolio Link */}
            <a
              href="https://kuldeeps-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200"
              aria-label="Portfolio"
            >
              <FaPortrait className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Portfolio
              </span>
            </a>

            {/* Email Link */}
            <a
              href="mailto:kuldeeppatil1659@gmail.com"
              className="group relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200"
              aria-label="Email"
            >
              <FiMail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Email
              </span>
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/8275561659/?text=Hi%20I%20have%20a%20question%20regarding%20your%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-gray-700/50 hover:bg-green-600/20 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                WhatsApp
              </span>
            </a>

            {/* GitHub Link (Added for completeness) */}
            <a
              href="https://github.com/Kuldeeppatil1659"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                GitHub
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-xs text-gray-500">
            <span>Built with</span>
            <FiHeart className="text-red-500 inline animate-pulse" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;