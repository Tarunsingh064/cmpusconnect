'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: ''
  });

  //const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('https://campusconnect-ki0p.onrender.com/api/user/register/', formData);
      setSuccess(true);
      setMessage('✅ Signup successful! Redirecting to login... 😄');

      console.log(res.data);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          username: '',
          email: '',
          password: '',
          phone_number: ''
        });
        setSuccess(false);
        setMessage('');
        setLoading(false);
      }, 4000); // 4 seconds delay
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      setMessage('❌ Signup failed. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5c1d91] via-[#6d28d9] to-[#a855f7] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Join Campus Nexus</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-3 cursor-pointer text-sm text-purple-300"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <div>
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <p className="text-xs text-purple-200 mt-1">
              ⚠️ Please enter your phone number carefully. <br />
              <strong>It can't be edited after registration.</strong>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading && (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {message && (
            <p className={`text-sm text-center mt-3 ${success ? 'text-green-300' : 'text-red-200'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
