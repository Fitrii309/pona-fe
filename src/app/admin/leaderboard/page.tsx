"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: number;
  name: string;
  points: number;
  avatar: string;
};

export default function LeaderboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari backend
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get("http://localhost:3001/leaderboard");
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
          <div className="flex justify-between px-2 md:px-6 py-2 md:py-3 text-gray-500 text-xs md:text-sm font-semibold border-b">
            <span>Nama</span>
            <span className="col-span-2 text-right">Poin</span>
          </div>

          {/* Rows */}
          {sorted.length > 0 ? (
            sorted.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between px-2 md:px-6 py-2 md:py-3 border-b hover:bg-gray-50 transition text-sm md:text-base"
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <span className="text-base md:text-lg w-5 md:w-6 text-center shrink-0">
                    {getMedal(index + 1)}
                  </span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium truncate">{student.name}</span>
                </div>

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
