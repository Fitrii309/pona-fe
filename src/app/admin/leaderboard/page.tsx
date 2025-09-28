"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api"; 

type Student = {
  id: number;
  no: string;
  name: string;
  points: number;
  kelas: string;
  jurusan: string;
};

export default function LeaderboardPage() {

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari backend
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await api.get("/leaderboard?limit=10");
        setStudents(response.data); 
      } catch (error) {
        console.error("Gagal fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Urutkan descending berdasarkan points
  const sorted = [...students].sort((a, b) => b.points - a.points);

  const getMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Leaderboard</h2>
        <div className="border-b border-gray-300"></div>
      </div>

      <div className="flex justify-center p-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm w-full h-auto md:min-w-[500px] lg:min-w-[600px]">

      {/* Header row */}
      <div className="grid grid-cols-5 px-2 md:px-6 py-2 md:py-3 text-gray-500 text-xs md:text-sm font-semibold border-b">
        <span>No.</span>
        <span>Nama</span>
        <span className="text-center">Kelas</span>
        <span className="text-center">Jurusan</span>
        <span className="text-right">Poin</span>
      </div>

      {/* Rows */}
      {sorted.length > 0 ? (
        sorted.map((student, index) => (
          <div
            key={student.id}
            className="grid grid-cols-5 items-center px-2 md:px-6 py-2 md:py-3 border-b hover:bg-gray-50 transition text-sm md:text-base"
          >
            {/* Kolom No → langsung medali */}
            <div>{getMedal(index + 1)}</div>

            {/* Kolom Nama */}
            <div className="truncate">{student.name}</div>

            {/* Kolom Kelas */}
            <div className="text-center">{student.kelas}</div>

            {/* Kolom Jurusan */}
            <div className="text-center">{student.jurusan}</div>

            {/* Kolom Poin */}
            <div className="text-right font-semibold text-gray-700">
              {student.points}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-4 text-gray-500">Belum ada data</p>
    )}
        </div>
      </div>
    </div>
  );
}
