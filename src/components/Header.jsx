'use client';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../app/Auth/Authcontext/page'; // ✅ adjust path if needed

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ get user and logout function

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] px-6 md:px-16 py-4 shadow-md">
      {/* Navbar wrapper */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-500 shadow-md border border-purple-400" />
          <span className="text-white font-bold text-xl">
            Campus<span className="text-cyan-400">Connect</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between w-full px-8">
          {/* Centered Nav Links */}
          <div className="flex-1 flex justify-center gap-8">
            <Link href="/" className="text-white font-medium hover:text-cyan-400 border-b-2 border-cyan-400 pb-1">
              Home
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-white transition">
              Projects
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-white font-medium bg-cyan-700 px-4 py-2 rounded hover:bg-cyan-800 transition"
                >
                  Dashboard
                </Link>
                {/* TEMPORARY Logout Button */}
                <button
                  onClick={logout}
                  className="text-white font-medium bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/Auth/login"
                  className="flex items-center gap-1 text-white px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 transition"
                >
                  <FiLogIn />
                  Log In
                </Link>
                <Link
                  href="/Auth/Signup"
                  className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                >
                  <FaUser />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link href="/" className="text-white hover:text-cyan-400">Home</Link>
          <Link href="/projects" className="text-white hover:text-cyan-400">Projects</Link>
          <Link href="/about" className="text-white hover:text-cyan-400">About</Link>

          {user ? (
            <>
              <Link href="/dashboard" className="text-white bg-cyan-800 px-3 py-2 rounded hover:bg-cyan-900">
                Dashboard
              </Link>
              {/* TEMPORARY Logout Button (Mobile) */}
              <button
                onClick={logout}
                className="text-white bg-red-600 px-3 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/Auth/login"
                className="text-white border border-gray-600 px-3 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
              >
                <FiLogIn />
                Log In
              </Link>
              <Link
                href="/Auth/Signup"
                className="bg-blue-900 text-white px-3 py-2 rounded hover:bg-purple-600 flex items-center gap-2"
              >
                <FaUser />
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
