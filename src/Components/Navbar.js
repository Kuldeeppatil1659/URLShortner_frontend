import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Slices/UserProfile";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch
  const { isAuthenticated, user } = useSelector((state) => state.userProfile); // Get the user and isAuthenticated state from the useAuth hook
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logoutUser action
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm justify-between items-center sticky top-0 z-50">
        {!isAuthenticated ? (
          <button
            onClick={() => handleNavigation("/")}
            className="btn btn-ghost text-xl"
          >
            Linklyfy
          </button>
        ) : (
          <div className="avatar placeholder">
            <div className="w-12 h-12 rounded-full bg-base-200 text-base-content border border-base-200 flex items-center justify-center font-bold">
              <span>U</span>
            </div>
          </div>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-ghost text-xl">
            Logout
          </button>
        ) : (
          <button
            onClick={() => handleNavigation("/Login")}
            className="btn btn-ghost text-xl"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
