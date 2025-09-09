"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, User, ClipboardList, LogOut } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="h-screen w-60 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex flex-col items-center">
      <div className="w-15 h-15 relative mb-3">
        <Image
            src="/assets/point pona.png"
            alt="PONA"
            fill
        />
      </div>
        <h1 className="text-sm font-bold">ADMIN</h1>
        <h2 className="text-lg font-semibold">DASHBOARD</h2>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2 text-gray-400">
        <h3 className="text-xs font-bold text-yellow-500">MAIN MENU</h3>

        {/* Dropdown Menu */}
        <div>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center justify-between w-full px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Data Poin Murid
            </span>
            {openMenu ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openMenu && (
            <div className="ml-8 mt-1 space-y-1">
              <button className="flex items-center gap-2 px-2 py-1 text-sm hover:text-black hover:bg-orange-200 rounded-lg w-full">
                Employee Details
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 w-full px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <ClipboardList className="w-4 h-4" />
          Data Absen Murid
        </button>

        {/* Settings */}
        <h3 className="text-xs font-bold text-yellow-500 mt-4">SETTING</h3>

        <button className="flex items-center gap-2 w-full px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
