import React from "react";
import Link from "../Functionality/Link";
import { FiLink, FiTrendingUp, FiShield, FiZap } from "react-icons/fi";
import { AiOutlineQrcode } from "react-icons/ai";
import { MdAnalytics } from "react-icons/md";

const Hero1 = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <FiZap className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-white/90">
              Revolutionizing Link Management
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Shrink your links,
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              expand your influence.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Simplify sharing and boost engagement with intelligent link
            management. Create short, memorable links that drive real results.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-20">
            <Link />
          </div>

          {/* Features Grid with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - Link Management */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <FiLink className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Smart Link Management
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Organize, track, and optimize all your shortened links from a
                  single dashboard.
                </p>
              </div>
            </div>

            {/* Feature 2 - QR Codes */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <AiOutlineQrcode className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Instant QR Codes
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Generate beautiful, customizable QR codes for any link with
                  one click.
                </p>
              </div>
            </div>

            {/* Feature 3 - Analytics */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <MdAnalytics className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get detailed insights on clicks, geography, devices, and
                  referral sources.
                </p>
              </div>
            </div>

            {/* Feature 4 - Performance */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <FiTrendingUp className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Boost Engagement
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Create custom slugs and track performance to maximize your
                  reach.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-sm text-gray-400 mt-1">Links Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400 mt-1">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400 mt-1">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;