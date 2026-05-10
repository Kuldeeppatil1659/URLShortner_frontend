import React from "react";
import { useSelector } from "react-redux";
import { FiExternalLink, FiCalendar, FiHash, FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

const Display = ({ type }) => {
  const data = useSelector((state) => state.responseStorage?.responseStorage);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const isQRType = type === "qr";

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          No {isQRType ? "QR Codes" : "Links"} Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {isQRType 
            ? "Generate your first QR code to see it here!" 
            : "Shorten your first link to see it here!"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {isQRType ? "Your QR Codes" : "Your Shortened Links"}
            </h2>
            <div className="bg-white/20 rounded-lg px-3 py-1">
              <span className="text-white text-sm font-medium">
                Total: {data.length}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <FiHash className="text-sm" />
                    <span>#</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Original URL
                </th>
                {isQRType ? (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    QR Code
                  </th>
                ) : (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Short Link
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="text-sm" />
                    <span>Created At</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data?.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  {/* Index */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {index + 1}
                  </td>

                  {/* Original URL */}
                  <td className="px-6 py-4">
                    <a
                      href={item.original}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 break-all"
                    >
                      {item.original.length > 50 
                        ? `${item.original.substring(0, 50)}...` 
                        : item.original}
                      <FiExternalLink className="text-xs inline-flex flex-shrink-0" />
                    </a>
                  </td>

                  {/* QR Code or Short Link */}
                  {isQRType ? (
                    <td className="px-6 py-4">
                      <div className="relative group">
                        <img
                          src={item.qrCode}
                          alt="QR Code"
                          className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <a
                            href={item.qrCode}
                            download={`qrcode-${index+1}.png`}
                            className="text-white text-xs bg-white/20 rounded px-2 py-1 hover:bg-white/30 transition-colors"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 group">
                        <a
                          href={`${process.env.REACT_APP_API_URL}/${item.short}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                        >
                          {`${process.env.REACT_APP_API_URL}/${item.short}`.length > 40
                            ? `${`${process.env.REACT_APP_API_URL}/${item.short}`.substring(0, 40)}...`
                            : `${process.env.REACT_APP_API_URL}/${item.short}`}
                        </a>
                        <button
                          onClick={() => copyToClipboard(`${process.env.REACT_APP_API_URL}/${item.short}`, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === index ? (
                            <FiCheck className="text-green-500 text-sm" />
                          ) : (
                            <FiCopy className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm" />
                          )}
                        </button>
                      </div>
                    </td>
                  )}

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Display;