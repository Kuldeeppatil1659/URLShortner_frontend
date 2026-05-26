import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../Api/User";
import { setUserProfile } from "../../Slices/UserProfile";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash, FaLock, FaArrowRight } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.emailOrUsername.trim()) {
      toast.error("Please enter email ");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginApi(formData);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUserProfile(response.data.data));
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        navigate("/main");
      }
      if (response.status === 400) {
        toast.error(response.data.message);
      }
      if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Brand Section */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white/90">Secure Login</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome Back!
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Ready to shorten?
                </span>
              </h1>
              
              <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
                Access your dashboard, manage your links, and track performance analytics with ease.
              </p>
              
              <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Instant link shortening</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>QR code generation</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative group">
                {/* Animated gradient border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Sign In</h2>
                      <p className="text-gray-300 mt-2">Access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Email/Username Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="emailOrUsername"
                            value={formData.emailOrUsername}
                            placeholder="example@xyz.com"
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 bg-white/5 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-300">Remember me</span>
                        </label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Sign In <FaArrowRight />
                          </span>
                        )}
                      </button>


                      {/* Sign Up Link */}
                      <div className="text-center pt-4">
                        <p className="text-gray-300">
                          New to ShortyURL?{" "}
                          <Link
                            to="/register"
                            className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors"
                          >
                            Create an account
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
