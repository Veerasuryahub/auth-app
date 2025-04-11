import React, { useState } from 'react';
import axios from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (useOtp) {
        res = await axios.post('/auth/verify-otp', { email, otp, password });
      } else {
        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        res = await axios.post(endpoint, { email, password });
      }
      setMessage(res.data.message);
  
      // Redirect on success
      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };
  

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/auth/send-otp', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // or your Google OAuth route
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-green-200 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <AnimatePresence>
            {useOtp ? (
              <>
                <motion.input
                  key="otp"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  type="text"
                  required
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </>
            ) : (
              <motion.input
                key="password"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              />
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            {useOtp ? 'Verify OTP' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {isLogin && (
  <div className="flex justify-between items-center mt-2 text-sm">
    <button
      type="button"
      onClick={() => setUseOtp(!useOtp)}
      className="text-blue-500 hover:underline"
    >
      {useOtp ? 'Use password instead' : 'Use OTP instead'}
    </button>

    {useOtp && (
      <button
        type="button"
        onClick={handleSendOtp}
        className="text-blue-500 hover:underline"
      >
        Resend OTP
      </button>
    )}
  </div>
)}


        <p className="text-center text-red-500 text-sm mt-4">{message}</p>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
              }}
              className="text-blue-600 font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
