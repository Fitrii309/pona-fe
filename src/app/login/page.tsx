"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Import } from "lucide-react";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

// Request interceptor → tempel token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Flag biar nggak infinite loop
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Fungsi bantu untuk antrian request
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}
function onRrefreshed(newToken: string) {
  refreshSubscribers.map((cb) => cb(newToken));
  refreshSubscribers = [];
}

// Response interceptor → handle expired token
api.interceptors.response.use(
  (res) => res, // kalau sukses langsung return
  async (err) => {
    const originalRequest = err.config;

    // Kalau token expired (401)
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Kalau lagi refresh, tunggu dulu
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Panggil endpoint refresh token
        const res = await axios.post("http://localhost:3000/refresh", {
          refreshToken: localStorage.getItem("refresh_token"),
        });

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        // Update semua request yang lagi nunggu
        onRrefreshed(newAccessToken);

        // Retry request yang gagal tadi
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // paksa user login ulang
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export { api };


export default function Login() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
            <img
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
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="Email"
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
