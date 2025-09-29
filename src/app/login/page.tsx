"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
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

export default function Login() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", user.role);

      // Redirect sesuai role
      if (user.role === "ADMIN") {
        route.push("/admin");
      } else if (user.role === "GURU") {
        route.push("/guru");
      } else {
        route.push("/murid");
      }
    } catch (error: unknown) {
      console.error("Login gagal:", error);
      setErrorMessage("Login gagal, cek email atau password.");
      setOpen(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        {/* Logo */}
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

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

      {/* AlertDialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Gagal</AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Tutup
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Coba Lagi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
