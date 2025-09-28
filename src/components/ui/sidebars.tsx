"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SidebarMenu() {
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login"); 
  }

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
      <div className="flex-1 p-4 space-y-2 text-gray-400">
        <h3 className="text-xs font-bold text-yellow-500 mt-6">SETTING</h3>

        <Link
          href="/murid/profiles/"
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <User className="w-4 h-4" />
          Profiles
        </Link>

        <button
          onClick={() => setOpenLogout(true)}
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full text-red-500 font-semibold"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <AlertDialog open={openLogout} onOpenChange={setOpenLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari akun ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenLogout(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
