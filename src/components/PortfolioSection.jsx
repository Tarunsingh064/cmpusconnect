'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/Authcontext/Authcontext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PortfolioSection() {
  const { user } = useAuth();
  const [bio, setBio] = useState(null);
  const [bioExists, setBioExists] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await axios.get('https://campusconnect-ki0p.onrender.com/api/userbio/portfolio/', {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        });
        setBio(res.data);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        setBioExists(false);
      }
    };

    if (user?.username) {
      fetchBio();
    }
  }, [user]);

  if (!bioExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl mb-4">No bio found for this user.</p>
        <Link
          onClick={() => router.push('/settings')}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
          href="/Auth/SettingForm/"
        >
          Create Bio
        </Link>
      </div>
    );
  }

  if (!bio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-lg animate-pulse">Loading Bio...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white rounded-2xl border border-gray-600 shadow-2xl p-5 relative overflow-hidden"
      >
        {/* Gradient ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-yellow-500/30 to-indigo-500/20 blur-[2px] pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10 max-h-[75vh] overflow-y-auto custom-scroll space-y-4">
          {/* Username */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-400">{user?.username}</h2>
            <p className="text-xs text-gray-400">User Profile</p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
              <Image
                src={user?.profileImage || '/placeholder-user.png'}
                alt="Profile Image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info Fields */}
          <div className="space-y-3 text-sm">
            <InfoRow label="Email" value={user?.email} />
            <InfoRow label="Bio" value={bio.bio} scrollable />
            <InfoRow label="College" value={bio.college_name} />
            <InfoRow label="Year" value={bio.college_year} />
            <InfoRow label="Location" value={bio.location} />
            {/* Add more fields here if needed */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ✅ Info Row with word limit and scroll for Bio
function InfoRow({ label, value, scrollable = false }) {
  const wordCount = value ? value.trim().split(/\s+/).length : 0;
  const limitedValue =
    scrollable && wordCount > 200
      ? value.trim().split(/\s+/).slice(0, 200).join(' ') + '...'
      : value;

  return (
    <div className="flex flex-col border-b border-gray-700 pb-2">
      <span className="text-gray-400 text-xs mb-1">{label}</span>
      {scrollable ? (
        <div className="max-h-24 overflow-y-auto text-xs p-2 bg-zinc-800 rounded-md whitespace-pre-wrap custom-scroll">
          {limitedValue || '—'}
        </div>
      ) : (
        <span className="text-sm font-medium text-white break-words">{value || '—'}</span>
      )}
    </div>
  );
}
