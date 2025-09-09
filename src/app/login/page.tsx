"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tambahkan logika login di sini
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/point pona.png"
            alt="PONA"
            width={200}
            height={200}
          />
        </div>

        <h1 className="text-xl font-bold text-center text-blue-700 mb-8">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email..."
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
