'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans overflow-x-hidden">
      {/* Topbar */}
      <div className="w-full bg-black/30 backdrop-blur-md shadow-md px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between gap-4 text-sm sm:text-base">
        <input
          type="text"
          placeholder="Search students, projects, hackathons..."
          className="w-full px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Main Layout - Responsive Stack on Mobile */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 p-4 sm:p-6 space-y-8 sm:space-y-10 bg-white/10 backdrop-blur-sm text-white shadow-inner rounded-none lg:rounded-tr-3xl lg:rounded-br-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-purple-400">
            DevConnect
          </h2>

          <ul className="space-y-4 text-base sm:text-lg font-medium">
            <li className="text-purple-300 hover:text-white transition">Feed</li>
            <li className="hover:text-white transition">Find Teams</li>
            <li className="hover:text-white transition">Alumni Connect</li>
            <li className="hover:text-white transition">Messages</li>
            <li className="hover:text-white transition">Mentorship</li>
          </ul>

          <Link
            href="/Auth/setting"
            className="block text-purple-300 hover:text-white transition text-base sm:text-lg"
          >
            ⚙️ Settings
          </Link>

          <div className="mt-10 p-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-2xl text-center shadow-lg">
            <p className="text-lg sm:text-xl font-semibold">Weekly Challenge</p>
            <button className="mt-4 px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:scale-105 transition">
              Join Challenge
            </button>
          </div>
        </aside>

        {/* Middle Content */}
        <main className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-dashed border-gray-500 rounded-2xl p-6 sm:p-10 text-center text-gray-300 text-sm sm:text-base"
          >
            🚧 This is your middle content area. You can build post feed, editor, etc. here later.
          </motion.div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 p-4 sm:p-6 space-y-8 bg-white/10 backdrop-blur-sm text-white shadow-inner rounded-none lg:rounded-tl-3xl lg:rounded-bl-3xl">
          {/* Alumni Spotlight */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-purple-300">Alumni Spotlight</h3>
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-semibold text-white">David Kim</p>
                <p className="text-gray-400">Software Engineer at Google<br />Class of 2019</p>
              </div>
              <div>
                <p className="font-semibold text-white">Lisa Zhang</p>
                <p className="text-gray-400">Product Manager at Meta<br />Class of 2020</p>
              </div>
              <button className="mt-4 text-purple-300 font-medium hover:underline">
                View All Alumni
              </button>
            </div>
          </div>

          {/* Trending Tech */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-purple-300">Trending Tech</h3>
            <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
              <li>React <span className="text-green-400 ml-2">+15%</span></li>
              <li>Python <span className="text-green-400 ml-2">+12%</span></li>
              <li>Next.js <span className="text-green-400 ml-2">+20%</span></li>
              <li>TypeScript <span className="text-green-400 ml-2">+18%</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
