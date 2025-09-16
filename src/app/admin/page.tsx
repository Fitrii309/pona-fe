"use client";

import React from "react";
import Image from "next/image";


export default function Dashboard() {
   const user = {
          name: "John Doe",
          avatar: "/pp.jpeg", // put your profile image in public folder
    };

  return (
    <div className="flex-1 pt-2 px-4">
          <div className="flex flex-col md:flex-row w-full">
            {/* Main Content */}
            <main className="flex-1">
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
              </div>
            </main>
          </div>
      <h1 className="text-2xl font-bold mb-4 mt-10">Selamat datang di Admin Dashboard</h1>
      <p className="text-gray-700">Gunakan sidebar untuk menavigasi through different sections.</p>
    </div>
  );
}