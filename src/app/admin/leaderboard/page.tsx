"use client";

import Image from "next/image";

type Student = {
  id: number;
  name: string;
  points: number;
  avatar: string;
};

export default function LeaderboardPage() {
  const students: Student[] = [
    { id: 1, name: "Ambayong Bayong", points: 5075, avatar: "/pp.jpeg" },
    { id: 2, name: "Olivia Rodrigo", points: 4985, avatar: "/pp.jpeg" },
    { id: 3, name: "Raff", points: 4642, avatar: "/pp.jpeg" },
    { id: 4, name: "Bernadya", points: 3874, avatar: "/pp.jpeg" },
    { id: 5, name: "Mihu Mihu", points: 3567, avatar: "/pp.jpeg" },
    { id: 6, name: "Lorem Ipsum", points: 3478, avatar: "/pp.jpeg" },
    { id: 7, name: "NIKI", points: 3387, avatar: "/pp.jpeg" },
    { id: 8, name: "Juicy Luicy", points: 3257, avatar: "/pp.jpeg" },
    { id: 9, name: "Nadin Amizah", points: 3250, avatar: "/pp.jpeg" },
    { id: 10, name: "Iyang", points: 3212, avatar: "/pp.jpeg" },
  ];

  const sorted = [...students].sort((a, b) => b.points - a.points);

  const getMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Leaderboard</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[320px]">
          {/* Header row */}
          <div className="flex justify-between px-2 md:px-6 py-2 md:py-3 text-gray-500 text-xs md:text-sm font-semibold border-b">
            <span>Nama</span>
            <span className="col-span-2 text-right">Poin</span>
          </div>

          {/* Rows */}
          {sorted.map((student, index) => (
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

              <div></div>

              <div className="text-right font-semibold text-gray-700">
                {student.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
