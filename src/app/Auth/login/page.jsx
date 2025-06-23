'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Auth/Authcontext/page';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth(); // ✅ use context login method

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    try {
      const ok = await login(formData.username, formData.password); // ✅ use context login
      if (ok) {
        setSuccess(true);
        setMessage('✔️ Login successful! Redirecting...');
        setTimeout(() => {
          setLoading(false);
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage('❌ Login failed. Please check credentials.');
      setLoading(false);
    }
  };

  return (
    // 🔒 Your full login UI remains unchanged
    <div className="min-h-screen bg-gradient-to-br from-[#5c1d91] via-[#6d28d9] to-[#a855f7] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            <span onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-3 cursor-pointer text-sm text-purple-300">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <button type="submit" disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            {loading && <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {message && <p className={`text-sm text-center mt-3 ${success ? 'text-green-300' : 'text-red-200'}`}>{message}</p>}
        </form>
        <div className="mt-6 text-center text-sm text-purple-200 space-y-1">
          <p>Don't have an account? <a href="/signup" className="underline hover:text-white transition">Create Account</a></p>
          <p>Forgot password? <a href="/reset-password" className="underline hover:text-white transition">Reset Here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
