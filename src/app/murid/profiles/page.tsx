"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Siswa = {
  id_siswa: number;
  nama: string;
  nisn: number;
  kelas: string;
  jurusan: string | null;
  total_poin: number;
  avatar: string;
};

export default function ProfilePage() {
  const [student, setStudent] = useState<Siswa | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/bio/SISWA", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // kalau pakai JWT
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data: Siswa = await res.json();
        setStudent(data);
      } catch (err: unknown) {
  const errorMessage =
    err instanceof Error ? err.message : "Unexpected error";
  setError(errorMessage);
      }
    }

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center pb-10">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Profile</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden">
            <Image
              src={student.avatar || "/pp.jpeg"}
              alt={student.nama || "Profile"}
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
        </div>

        {/* Nama */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">Nama</label>
          <input
            type="text"
            value={student.nama}
            readOnly
            className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
          />
        </div>

        {/* NISN */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">NISN</label>
          <input
            type="text"
            value={student.nisn}
            readOnly
            className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
          />
        </div>

        {/* Kelas + Jurusan */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <div className="sm:w-20">
            <label className="block text-gray-500 text-sm mb-1">KELAS</label>
            <input
              type="text"
              value={student.kelas}
              readOnly
              className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-500 text-sm mb-1">JURUSAN</label>
            <input
              type="text"
              value={student.jurusan ?? "-"}
              readOnly
              className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
