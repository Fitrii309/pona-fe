"use client";

import Image from "next/image";

export default function WelcomePage() {
  const user = {
    name: "John Doe",
    points: 100,
    avatar: "/pp.jpeg", // put your profile image in public folder
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-6">
          Welcome, <span className="text-orange-500">[{user.name}]</span>
        </h1>

        <div className="flex flex-col items-center gap-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
            
          </div>

          {/* Point Section */}
          <div className="mt-4 w-48 rounded-xl shadow-md p-4 bg-gray-50 flex flex-col items-center">
            <div className="text-yellow-500 text-3xl">⭐</div>
            <span className="text-3xl font-bold text-blue-900">
              {user.points}
            </span>
            <p className="text-sm text-gray-500">Total Point</p>
          </div>
        </div>
      </main>
    </div>
  );
}
