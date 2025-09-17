"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/ui/sidebarss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true); //default: sidebar terbuka
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {open && (
        <div className="w-60">
          <Sidebar />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-green-700 text-white p-4 flex items-center">
          <button onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 font-bold">Guru Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 pt-10 px-10 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}