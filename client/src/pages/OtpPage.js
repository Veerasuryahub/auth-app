import React, { useState } from 'react';
import axios from '../api/axios';

const OtpPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to send OTP');
    }
  };
  

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/verify-otp', { email, otp, newPassword });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || 'OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {step === 1 && (
        <form onSubmit={sendOtp}>
          <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send OTP</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Verify & Reset</button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
};

export default OtpPage;
