"use client";

import Image from "next/image";

export default function ProfilePage() {
  const student = {
    name: "John Doe",
    nisn: "0081826624",
    jurusan: "Rekayasa Perangkat Lunak",
    kelas: 12,
    avatar: "/pp.jpeg",
  };

  return (
    <div className="w-full">
      <div className="flex items-center pb-10">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Profile</h2>
      </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden">
              <Image
                src={student.avatar}
                alt={student.name}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-1">Nama</label>
            <input
              type="text"
              value={student.name}
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

          {/* Kelas + Jurusan in one row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-2">
            {/* Kelas */}
            <div className="sm:w-20">
              <label className="block text-gray-500 text-sm mb-1">KELAS</label>
              <input
                type="text"
                value={student.kelas}
                readOnly
                className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
              />
            </div>

            {/* Jurusan */}
            <div className="flex-1">
              <label className="block text-gray-500 text-sm mb-1">JURUSAN</label>
              <input
                type="text"
                value={student.jurusan}
                readOnly
                className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
