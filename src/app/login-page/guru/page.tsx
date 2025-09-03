"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LoginMurid() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center mb-7">
            <span className="text-9xl">⭐</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-center text-blue-700 mb-8">
          Login Guru
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="username"
              placeholder="Masukkan username..."
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan Password..."
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-full font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
