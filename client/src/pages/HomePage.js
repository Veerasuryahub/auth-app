import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any localStorage/sessionStorage item
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Welcome to Hirely!</h1>
      <p className="text-lg text-gray-600 mb-6">You are now logged in successfully.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
