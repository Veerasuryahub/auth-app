// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from '../api/axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', { email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-green-400">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm text-red-500">{message}</p>}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
