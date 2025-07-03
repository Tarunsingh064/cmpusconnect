export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Topbar */}
      <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search students, projects, hackathons..."
          className="flex-1 max-w-xl px-4 py-2 border rounded-md outline-none bg-gray-100"
        />
        <div className="flex items-center gap-4 ml-6">
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            <i className="fa-regular fa-bell text-gray-600"></i>
          </div>
          <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/5 border-r bg-white p-4 space-y-6">
          <h2 className="text-lg font-semibold">DevConnect</h2>
          <ul className="space-y-4 text-sm">
            <li className="font-medium text-blue-600">Feed</li>
            <li>Find Teams</li>
            <li>Alumni Connect</li>
            <li>Messages</li>
            <li>Mentorship</li>
            <li>Settings</li>
          </ul>
          <div className="mt-10 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm text-center">
            Weekly Challenge<br />
            <button className="mt-2 px-4 py-1 bg-white text-purple-600 font-semibold rounded-md">
              Join Challenge
            </button>
          </div>
        </div>

        {/* Middle Section (you’ll build this later) */}
        <div className="w-3/5 bg-gray-100 p-6 min-h-screen">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500">
            {/* Placeholder */}
            This is your middle content area. You can build post feed, editor, etc. here later.
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/5 border-l bg-white p-4 space-y-8">
          {/* Alumni Spotlight */}
          <div>
            <h3 className="text-md font-semibold mb-3">Alumni Spotlight</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium">David Kim</p>
                <p className="text-gray-500">Software Engineer at Google<br />Class of 2019</p>
              </div>
              <div>
                <p className="font-medium">Lisa Zhang</p>
                <p className="text-gray-500">Product Manager at Meta<br />Class of 2020</p>
              </div>
              <button className="mt-2 text-blue-500 text-sm">View All Alumni</button>
            </div>
          </div>

          {/* Trending Tech */}
          <div>
            <h3 className="text-md font-semibold mb-2">Trending Tech</h3>
            <ul className="text-sm space-y-1">
              <li>React <span className="text-green-600 ml-1">+15%</span></li>
              <li>Python <span className="text-green-600 ml-1">+12%</span></li>
              <li>Next.js <span className="text-green-600 ml-1">+20%</span></li>
              <li>TypeScript <span className="text-green-600 ml-1">+18%</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
