"use client";

import { useState } from "react";
import { User, ClipboardList, LogOut, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SidebarMenu() {
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  return (
    <div className="h-screen w-60 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex flex-col items-center">
        <div className="w-15 h-15 relative mb-3">
          <Link href={"/guru"}>
            <Image src="/assets/point pona.png" alt="PONA" fill />
          </Link>
        </div>
        <h1 className="text-sm font-bold">GURU</h1>
        <h2 className="text-lg font-semibold">DASHBOARD</h2>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2 text-gray-400">
        <h3 className="text-xs font-bold text-yellow-500">MAIN MENU</h3>
        <Link
          href="/guru/kebaikan"
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <Star className="w-4 h-4" />
          Kategori Kebaikan
        </Link>
        <Link
          href="/guru/tambah-poin"
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <ClipboardList className="w-4 h-4" />
          Tambah Poin Kebaikan
        </Link>

        {/* Settings */}
        <h3 className="text-xs font-bold text-yellow-500 mt-4">SETTING</h3>
        <Link
          href="/guru/profile"
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <User className="w-4 h-4" />
          Profile
        </Link>
        <button
          onClick={() => setOpenLogout(true)}
          className="flex items-center gap-2 px-3 py-2 hover:text-black hover:bg-orange-200 rounded-lg w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

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
    </div>
  );
}
