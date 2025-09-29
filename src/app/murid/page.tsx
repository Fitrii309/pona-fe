"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// bikin type sesuai response dari NestJS
type Siswa = {
  id_siswa: number;
  nama: string;

  total_poin: number;
};

export default function WelcomePage() {
  const [user, setUser] = useState<Siswa | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/bio/SISWA", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // kirim JWT
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Siswa = await res.json();
        setUser(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unexpected error";
        setError(message);
      }
    }
    fetchData();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row w-full">
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-6">
          Welcome, <span className="text-orange-500">{user.nama}</span>
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/pp.jpeg"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h2 className="mt-3 text-lg font-semibold">{user.nama}</h2>
            <p className="text-sm text-gray-500">
            </p>
          </div>

          <div className="mt-4 w-48 rounded-xl shadow-md p-4 bg-gray-50 flex flex-col items-center">
            <div className="text-yellow-500 text-3xl">⭐</div>
            <span className="text-3xl font-bold text-blue-900">
              {user.total_poin}
            </span>
            <p className="text-sm text-gray-500">Total Point</p>
          </div>
        </div>
      </main>
    </div>
  );
}
