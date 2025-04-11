import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-300 flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-white text-3xl font-bold">AuthFlow</h1>
        <div>
          <button onClick={() => navigate('/auth')} className="text-white font-semibold mr-4 hover:underline">Login</button>
          <button onClick={() => navigate('/auth')} className="bg-white text-blue-600 px-5 py-2 rounded-full shadow hover:bg-gray-100">Sign Up</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Secure & Simple Authentication</h2>
        <p className="text-white text-lg max-w-xl mb-8">
          Manage access to your platform with ease. Protect users with email-based OTP verification and strong authentication.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="bg-white text-blue-600 text-lg px-6 py-3 rounded-full shadow hover:bg-gray-100 transition duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
