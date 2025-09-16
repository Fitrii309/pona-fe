"use client";

import { User, LogOut, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarMenu() {
  return (
    <div className="h-screen w-60 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex flex-col items-center">
        <Link href="/murid">
          <div className="w-15 h-15 relative mb-3">
            <Image
              src="/assets/point pona.png"
              alt="PONA"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </Link>
        <h1 className="text-sm font-bold">MURID</h1>
        <h2 className="text-lg font-semibold">DASHBOARD</h2>
      </div>

      {/* Menu */}
      <div className="flex-1  p-4 space-y-2 text-gray-400">
        <h3 className="text-xs font-bold text-yellow-500 mt-6">SETTING</h3>
        <Link
          href="/murid/profiles/"
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <User className="w-4 h-4" />
          Profiles
        </Link>
        <button
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
