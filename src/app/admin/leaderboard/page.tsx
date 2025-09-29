"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

type Student = {
  id_siswa: number;
  nama: string;
  kelas: string;
  jurusan: string;
  total_poin: number;
};

export default function LeaderboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await api.get("/leaderboard?limit=10");
        console.log("Response leaderboard:", response.data);

        // Mapping backend ke frontend
        const mapped: Student[] = response.data.map((item: any) => ({
          id_siswa: item.id_siswa,
          nama: item.nama,
          kelas: item.kelas,
          jurusan: item.jurusan,
          total_poin: item.totalPoin ?? 0, // ⚠ totalPoin dari backend
        }));

        setStudents(mapped);
      } catch (error) {
        console.error("Gagal fetch leaderboard:", error);
        toast.error("Gagal mengambil data leaderboard");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const sorted = [...students].sort((a, b) => b.total_poin - a.total_poin);

  const getMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Leaderboard</h2>
      </div>

      <div className="flex justify-center p-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm w-full h-auto md:min-w-[500px] lg:min-w-[600px]">
          {/* Header */}
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
                key={student.id_siswa}
                className="grid grid-cols-5 items-center px-2 md:px-6 py-2 md:py-3 border-b hover:bg-gray-50 transition text-sm md:text-base"
              >
                <div>{getMedal(index + 1)}</div>
                <div className="truncate">{student.nama}</div>
                <div className="text-center">{student.kelas}</div>
                <div className="text-center">{student.jurusan}</div>
                <div className="text-right font-semibold text-gray-700">
                  {student.total_poin}
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
