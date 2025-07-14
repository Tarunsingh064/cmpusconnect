'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/Authcontext/Authcontext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from  'next/link';

export default function PortfolioSection() {
  const { user } = useAuth();
  const [bio, setBio] = useState(null);
  const [bioExists, setBioExists] = useState(true); // assume true initially
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
        setBioExists(false); // bio doesn't exist
      }
    };

    if (user?.username) {
      fetchBio();
    }
  }, [user]);

  // If bio does not exist, show Create Bio button
  if (!bioExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl mb-4">No bio found for this user.</p>
        <Link
          onClick={() => router.push('/settings')}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
        href ="/Auth/SettingForm/"
        >
          Create Bio
        </Link>
      </div>
    );
  }

  // While loading
  if (!bio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-lg animate-pulse">Loading Bio...</p>
      </div>
    );
  }

  // If bio exists
  return (
  <div className="w-full p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-transparent">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-5xl bg-white dark:bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 p-6 md:p-10"
    >
      {/* Username */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">{user?.username}</h2>
        <p className="text-sm text-gray-400">User Profile</p>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 md:w-36 md:h-36 relative rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
          <Image
            src={user?.profileImage || '/placeholder-user.png'}
            alt="Profile Image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Info Fields */}
      <div className="space-y-4 text-sm md:text-base">
        <InfoRow label="Email" value={user?.email} />
        <InfoRow label="Bio" value={bio.bio} />
        <InfoRow label="College" value={bio.college_name} />
        <InfoRow label="Year" value={bio.college_year} />
        <InfoRow label="Location" value={bio.location} />
      </div>
    </motion.div>
  </div>
);

}

// InfoRow Component
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-1 border-gray-700">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-white">{value || '—'}</span>
    </div>
  );
}
