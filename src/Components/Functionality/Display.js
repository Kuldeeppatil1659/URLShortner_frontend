import React from "react";
import { useSelector } from "react-redux";

const Display = ({ type }) => {
  const data = useSelector((state) => state.responseStorage?.responseStorage);

  // Determine if we are displaying links or QR codes
  const isQRType = type === "qr";

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Original</th>
              {isQRType ? <th>QR Code</th> : <th>Short Link</th>}
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the data */}
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.original}</td>
                {isQRType ? (
                  <td>
                    <img
                      src={item.qrCode}
                      alt="QR Code"
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                ) : (
                  <td>
                    <a
                      href={`${process.env.REACT_APP_API_URL}/${item.short}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      {item.short}
                    </a>
                  </td>
                )}
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Display;
