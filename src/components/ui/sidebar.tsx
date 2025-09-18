"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, User, LogOut, Medal, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarMenu() {
  const [openGuru, setOpenGuru] = useState(false);
  const [openSiswa, setOpenSiswa] = useState(false);
  

  return (
    <div className="h-screen w-60 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex flex-col items-center">
      <div className="w-15 h-15 relative mb-3">
        <Link href={"/admin"}>
        <Image 
        src="/assets/point pona.png"
        alt="PONA"
        fill>
        </Image>
        </Link>
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
            onClick={() => setOpenGuru(!openGuru)}
            className="flex items-center justify-between w-full px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Data Guru
            </span>
            {openGuru ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openGuru && (
            <div className="ml-8 mt-1 space-y-1">
              <a href="/admin/guru" className="flex items-center gap-2 px-2 py-1 text-sm hover:text-black hover:bg-orange-200 rounded-lg w-full">
                Detail Guru
              </a>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setOpenSiswa(!openSiswa)}
            className="flex items-center justify-between px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Data Murid
            </span>
            {openSiswa ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {openSiswa && (
            <div className="ml-8 mt-1 space-y-1">
              <a href="/admin/murid" className="flex items-center gap-2 px-2 py-1 text-sm hover:text-black hover:bg-orange-200 rounded-lg w-full">
                Detail Murid
              </a>
            </div>
          )}
        </div>

        <a href="/admin/leaderboard" className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <Medal className="w-4 h-4" />
          Leaderboard
        </a>
        <a href="/admin/kebaikan" className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <Star className="w-4 h-4" />
          List Kategori Kebaikan
        </a>


        {/* Settings */}
        <h3 className="text-xs font-bold text-yellow-500 mt-4">SETTING</h3>

        <button className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
