'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* Topbar */}
      <div className="w-full bg-black/30 backdrop-blur-md shadow-md px-10 py-4 flex justify-between items-center text-lg">
        <input
          type="text"
          placeholder="Search students, projects, hackathons..."
          className="flex-1 max-w-2xl px-6 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-8 space-y-10 bg-white/10 backdrop-blur-sm rounded-tr-3xl rounded-br-3xl shadow-inner text-white">
          <h2 className="text-3xl font-bold tracking-wide text-purple-400">DevConnect</h2>

          <ul className="space-y-5 text-lg font-medium">
            <li className="text-purple-300 hover:text-white transition">Feed</li>
            <li className="hover:text-white transition">Find Teams</li>
            <li className="hover:text-white transition">Alumni Connect</li>
            <li className="hover:text-white transition">Messages</li>
            <li className="hover:text-white transition">Mentorship</li>
          </ul>

          <Link href="/Auth/setting" className="block text-purple-300 hover:text-white transition text-lg">
            ⚙️ Settings
          </Link>

          <div className="mt-16 p-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-2xl text-center shadow-lg">
            <p className="text-xl font-semibold">Weekly Challenge</p>
            <button className="mt-4 px-6 py-2 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:scale-105 transition">
              Join Challenge
            </button>
          </div>
        </aside>

        {/* Middle Section */}
        <main className="w-2/4 p-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-dashed border-gray-500 rounded-2xl p-16 text-center text-gray-300"
          >
            🚧 This is your middle content area. You can build post feed, editor, etc. here later.
          </motion.div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 p-10 space-y-12 bg-white/10 backdrop-blur-sm rounded-tl-3xl rounded-bl-3xl shadow-inner">
          {/* Alumni Spotlight */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-purple-300">Alumni Spotlight</h3>
            <div className="space-y-6 text-sm">
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
            <h3 className="text-xl font-bold mb-4 text-purple-300">Trending Tech</h3>
            <ul className="space-y-3 text-gray-200">
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
