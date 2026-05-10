import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpApi } from "../../Api/User";
import { toast } from "react-toastify";
import { validatePassword } from "../../Utility/ValidationPassword";
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.username.trim()) {
      toast.error("Please enter your username");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }
    if (errors.password) {
      toast.error(errors.password);
      return;
    }

    setIsLoading(true);
    try {
      const response = await SignUpApi(formData);
      console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/login"), 1500);
      }
      if (response.status === 400) {
        toast.error(response.data.message);
      }
      if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[@$!%*?&]/)) strength++;
    
    if (strength === 0) return { strength, text: "Very Weak", color: "bg-red-500" };
    if (strength === 1) return { strength, text: "Weak", color: "bg-orange-500" };
    if (strength === 2) return { strength, text: "Fair", color: "bg-yellow-500" };
    if (strength === 3) return { strength, text: "Good", color: "bg-blue-500" };
    return { strength, text: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Create Account</h2>
                  <p className="text-gray-300 mt-2">Join us and start shortening links</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe"
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400"
                        required
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
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Password Strength:</span>
                          <span className={`font-medium ${
                            passwordStrength.strength === 0 ? "text-red-400" :
                            passwordStrength.strength === 1 ? "text-orange-400" :
                            passwordStrength.strength === 2 ? "text-yellow-400" :
                            passwordStrength.strength === 3 ? "text-blue-400" :
                            "text-green-400"
                          }`}>
                            {passwordStrength.text}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Password requirements */}
                        <div className="text-xs space-y-1">
                          <div className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-green-400" : "text-gray-500"}`}>
                            {formData.password.length >= 8 ? <FiCheckCircle className="text-xs" /> : <FiXCircle className="text-xs" />}
                            <span>At least 8 characters</span>
                          </div>
                          <div className={`flex items-center gap-2 ${(formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/)) ? "text-green-400" : "text-gray-500"}`}>
                            {(formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/)) ? <FiCheckCircle className="text-xs" /> : <FiXCircle className="text-xs" />}
                            <span>Uppercase & lowercase letters</span>
                          </div>
                          <div className={`flex items-center gap-2 ${formData.password.match(/[0-9]/) ? "text-green-400" : "text-gray-500"}`}>
                            {formData.password.match(/[0-9]/) ? <FiCheckCircle className="text-xs" /> : <FiXCircle className="text-xs" />}
                            <span>Contains a number</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.password && !formData.password && (
                      <p className="mt-2 text-xs text-red-400">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign Up <FiArrowRight />
                      </span>
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-300">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors"
                      >
                        Sign in
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
  );
};

export default Register;