"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-800 px-4">
      <div className="w-full max-w-md bg-green-800 rounded-3xl p-20 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center mb-15">
          <span className="text-9xl">⭐</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white drop-shadow-2xl mb-3">PONA</h1>
        <p className="text-lg font-bold text-white drop-shadow-2xl mb-50">
          (Poin & Absen)
        </p>

        <p className="text-white font-semibold mb-4">Login Sebagai</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/login-page/murid"
            className="flex-1 bg-white border border-gray-300 rounded-full py-2 font-medium text-gray-800 shadow hover:bg-gray-100 transition text-center"
          >
            Murid
          </Link>
          <Link
            href="/login-page/guru"
            className="flex-1 bg-white border border-gray-300 rounded-full py-2 font-medium text-gray-800 shadow hover:bg-gray-100 transition text-center"
          >
            Guru
          </Link>
        </div>
      </div>
    </div>
  );
}
