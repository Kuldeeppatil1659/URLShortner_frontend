import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link as RouterLink } from "react-router-dom";
import { fetchLinks, sendLinkBackend } from "../../Api/Main";
import { useDispatch, useSelector } from "react-redux";
import { setResponseStorage } from "../../Slices/Links";
import Display from "./Display";
import { FiLink, FiCopy, FiCheck, FiArrowRight, FiUser, FiTrendingUp, FiShield } from "react-icons/fi";

const Link = () => {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [show, setShow] = useState(false);
  const [refreshLinks, setRefreshLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { username, _id } = useSelector(
    (state) => state.userProfile?.user || { username: "Guest", _id: null }
  );

  const payload = { createdBy: username, userId: _id };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchLinks({ userId: _id });
        console.log(response.data.data);
        dispatch(setResponseStorage(response.data.data));
        if (response.data.success) {
          console.log("User is authenticated");
          setShow(true);
        } else {
          setShow(false);
        }
      } catch (error) {
        console.error("Error validating authentication:", error);
        setShow(false);
      }
    };

    checkAuth();
  }, [dispatch, _id, refreshLinks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(link)) {
      toast.error("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendLinkBackend({ link, payload });
      console.log(response.data);
      console.log(process.env.REACT_APP_API_URL);
      setShortLink(`${process.env.REACT_APP_API_URL}/${response.data.data}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        setRefreshLinks((prev) => !prev);
        setLink(""); // Clear input after successful submission
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else if (response.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main Card */}
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                <FiLink className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Shorten Your URL
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Paste your long URL below and get a short, shareable link instantly
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLink className="text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="https://example.com/your-long-url-here"
                  className="block w-full pl-10 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Shortening...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Shorten URL <FiArrowRight className="text-lg" />
                  </span>
                )}
              </button>
            </form>

            {/* Result Section */}
            {shortLink && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Your shortened URL:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <a
                      href={shortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:underline break-all"
                    >
                      {shortLink}
                    </a>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    {copied ? (
                      <FiCheck className="text-green-500 text-xl" />
                    ) : (
                      <FiCopy className="text-gray-600 dark:text-gray-400 text-xl" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Signup Prompt */}
            {!show && (
              <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    Need more features?{" "}
                    <RouterLink
                      to="/register"
                      className="text-purple-600 dark:text-purple-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Sign up now <FiArrowRight className="text-sm" />
                    </RouterLink>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features for logged-in users */}
          {show && (
            <div className="bg-gray-50 dark:bg-gray-800/50 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Real-time Analytics
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Track clicks & engagement
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FiUser className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Personal Dashboard
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Manage all your links
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FiShield className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Secure & Reliable
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      99.9% uptime guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Component */}
      {show && (
        <div className="mt-12">
          <Display type="link" />
        </div>
      )}
    </div>
  );
};

export default Link;