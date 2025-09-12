"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import Image from "next/image";

export default function SidebarMenu() {
  const [openGuru, setOpenGuru] = useState(false);
  const [openSiswa, setOpenSiswa] = useState(false);

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
        <h1 className="text-sm font-bold">SISWA</h1>
        <h2 className="text-lg font-semibold">DASHBOARD</h2>
      </div>
      <div>
        {/* Settings */}
        <h3 className="text-xs font-bold text-yellow-500 mt-4">SETTING</h3>
        <button className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <User className="w-4 h-4" />
          Profile
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
