import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { sendQrCodeLinksBackend, fetchQrCodes } from "../../Api/Main";
import { useSelector, useDispatch } from "react-redux";
import { setResponseStorage } from "../../Slices/Links";
import Display from "./Display";
import { FiLink,  FiDownload, FiArrowRight, FiLoader } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa6";
import { AiOutlineQrcode } from "react-icons/ai";

const QrCode = () => {
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);
  const [refreshLinks, setRefreshLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewQr, setPreviewQr] = useState(null);
  const dispatch = useDispatch();
  const { username, _id } = useSelector((state) => state.userProfile?.user) || {};

  const payload = { createdBy: username, userId: _id };

  useEffect(() => {
    const checkAuth = async () => {
      if (!_id) {
        setShow(false);
        return;
      }
      
      try {
        const response = await fetchQrCodes({ userId: _id });
        console.log(response.data.data);
        dispatch(setResponseStorage(response.data.data));
        setShow(response.data.success);
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
      console.log(link);
      const response = await sendQrCodeLinksBackend({ payload, link });

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setResponseStorage(response.data.data));
        setRefreshLinks(!refreshLinks);
        setLink(""); // Clear input after successful generation
        
        // Set preview QR if available
        if (response.data.data && response.data.data[0]) {
          setPreviewQr(response.data.data[0].qrCode);
          setTimeout(() => setPreviewQr(null), 5000); // Hide preview after 5 seconds
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred while generating the QR code.");
    } finally {
      setIsLoading(false);
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
                <AiOutlineQrcode className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate QR Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Convert any URL into a scannable QR code instantly
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
                    <FiLoader className="text-lg animate-spin" />
                    <span>Generating QR Code...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaQrcode className="text-lg" />
                    Generate QR Code <FiArrowRight className="text-lg" />
                  </span>
                )}
              </button>
            </form>

            {/* Preview Section */}
            {previewQr && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 animate-fadeIn">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={previewQr}
                      alt="Generated QR Code"
                      className="w-20 h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      QR Code Generated Successfully!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your QR code has been added to the list below
                    </p>
                  </div>
                  <a
                    href={previewQr}
                    download="qrcode.png"
                    className="flex-shrink-0 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
                  >
                    <FiDownload className="text-purple-600 dark:text-purple-400" />
                  </a>
                </div>
              </div>
            )}

            {/* Signup Prompt for non-authenticated users */}
            {!show && (
              <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-3">
                    <FaQrcode className="text-purple-600 dark:text-purple-400 text-xs" />
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                      Save Your QR Codes
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create an account to save and manage all your QR codes!{" "}
                    <a
                      href="/register"
                      className="text-purple-600 dark:text-purple-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Sign up now <FiArrowRight className="text-sm" />
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features for logged-in users */}
          {show && (
            <div className="bg-gray-50 dark:bg-gray-800/50 px-8 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Real-time Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">High Resolution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Instant Download</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Component */}
      {show && (
        <div className="mt-12">
          <Display type="qr" />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default QrCode;