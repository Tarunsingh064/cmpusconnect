'use client';
import { FiArrowRight } from 'react-icons/fi';
import { FaCode, FaUserFriends } from 'react-icons/fa';
import { PiBookOpenTextLight } from 'react-icons/pi';
import {
 FiUser, FiUsers, FiCalendar, FiBookOpen, FiAward,
  FiMessageCircle, FiHeart, FiActivity, FiMonitor
} from 'react-icons/fi';
import { useAuth } from '@/Authcontext/Authcontext';
import Link from 'next/link';

export default function Herosection() {
  const {user} = useAuth();
  return (
    <>
    <section className="min-h-screen bg-[#0f172a] text-white pt-24 px-6 md:px-16 pb-6">
      {/* Top Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="max-w-2xl">
          <span className="inline-block bg-purple-700/30 text-purple-300 px-4 py-1 rounded-full mb-4 text-sm font-medium">
            Connect. Collaborate. Create.
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Where College <br />
            Innovators <span className="text-[#7dd3fc]">Connect & Create</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            Join the premier platform for college students to find project
            partners, showcase their work, and collaborate on innovative ideas.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            {user ? (
  <Link
  href="/Auth/dashboard"
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition"
>
  Explore
</Link>

) : (
  <Link
  href="/Auth/login"
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition"
>
  Get Started
</Link>

)}
            <button className="flex items-center gap-2 border border-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              <FiArrowRight />
              Browse Projects
            </button>
          </div>

          <div className="mt-12 flex gap-10 flex-wrap">
            <div className="flex items-center gap-3">
              <FaCode className="text-cyan-400 text-xl" />
              <div>
                <p className="font-semibold text-white">Coding Projects</p>
                <p className="text-sm text-gray-400">Find teammates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaUserFriends className="text-cyan-400 text-xl" />
              <div>
                <p className="font-semibold text-white">Peer Network</p>
                <p className="text-sm text-gray-400">Connect with students</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PiBookOpenTextLight className="text-cyan-400 text-xl" />
              <div>
                <p className="font-semibold text-white">Resources</p>
                <p className="text-sm text-gray-400">Access knowledge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-[#1e1b4b] rounded-xl p-8 w-[300px] min-h-[420px] shadow-lg border border-[#312e81] flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-purple-600 mx-auto mb-4" />
              <h3 className="text-center text-white font-bold text-lg">
                Campus Collab Connect
              </h3>
              <p className="text-center text-sm text-gray-400 mt-2">
                Launching your innovation journey
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-4 bg-gray-600 rounded-md" />
              <div className="h-4 bg-cyan-400 rounded-md" />
              <div className="h-4 bg-gray-600 rounded-md col-span-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider Margin */}
      <div className="mt-24 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything You Need to <span className="text-cyan-400">Succeed</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Campus Collab Connect brings together all the tools and connections students need to collaborate, learn, and build amazing projects.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#111827] hover:scale-105 transition-transform duration-300 rounded-xl p-6 border border-gray-700 hover:border-cyan-400"
            >
              <div className="text-cyan-400 text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

     <section
      className="relative bg-gradient-to-br from-[#0a0f1f] via-[#111827] to-[#0a0f1f] text-white py-24 px-6 md:px-16 overflow-hidden"
      style={{ backgroundAttachment: 'fixed' }} // Parallax effect
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold">
          How <span className="text-teal-400">Campus</span>
          <span className="text-green-400">Connect</span>{' '}
          <span className="text-purple-400">Works</span>
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Our platform makes it easy to connect with other students,
          collaborate on projects, and showcase your work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 text-center shadow-xl transition-transform hover:-translate-y-2 duration-300"
          >
            <div className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center border border-teal-500 text-teal-400 text-2xl">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </section>

    </>
  );
}

const features = [
  {
    icon: <FiUsers />,
    title: 'Find Project Partners',
    description: 'Connect with like-minded peers with complementary skills to form your dream project team.',
  },
  {
    icon: <FiMonitor />,
    title: 'Project Showcase',
    description: 'Display your best work and see what others are building to get inspired.',
  },
  {
    icon: <FiCalendar />,
    title: 'Campus Events',
    description: 'Never miss a hackathon, workshop or tech talk with our centralized event calendar.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Resource Library',
    description: 'Access and share notes, tutorials, and study materials with your campus community.',
  },
  {
    icon: <FiAward />,
    title: 'Recognition & Badges',
    description: 'Earn badges for your achievements and build credibility within the community.',
  },
  {
    icon: <FiMessageCircle />,
    title: 'Discussion Forums',
    description: 'Get your technical questions answered and help others by sharing your knowledge.',
  },
  {
    icon: <FiHeart />,
    title: 'Alumni Connect',
    description: "Get mentorship and career guidance from graduates who've been in your shoes.",
  },
  {
    icon: <FiActivity />,
    title: 'Innovation Hub',
    description: 'Discover exciting opportunities, internships, and external competitions.',
  },
];

const steps = [
  {
    icon: <FiUser />,
    title: 'Create Your Profile',
    description:
      'Sign up and showcase your skills, interests, and portfolio to connect with like-minded peers.',
  },
  {
    icon: <FiUsers />,
    title: 'Find Your Team',
    description:
      'Browse projects, join teams or create your own and invite others with complementary skills.',
  },
  {
    icon: <FiMonitor />,
    title: 'Build & Showcase',
    description:
      'Collaborate on projects, access resources, and showcase your work to the campus community.',
  },];