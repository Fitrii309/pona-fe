"use client";

import Image from "next/image";

export default function ProfilePage() {
  const student = {
    name: "Zoemmy",
    nip: "1298273891728",
    avatar: "/pp.jpeg",
  };

  return (
    <div className="p-4 sm:p-6 w-full">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Profile</h1>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
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
          <label className="block text-gray-500 text-sm mb-1">NIP</label>
          <input
            type="text"
            value={student.nip}
            readOnly
            className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
