"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [student, setStudent] = useState({
    name: "Zoemmy",
    nip: "1298273891728",
    avatar: "/pp.jpeg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // di sini bisa dipanggil API ke backend untuk update data
    console.log("Data disimpan:", student);
    setIsEditing(false);
  };

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
            name="name"
            value={student.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 rounded-md border font-semibold ${
              isEditing ? "text-black border-blue-400" : "text-gray-800"
            }`}
          />
        </div>

        {/* NIP */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">NIP</label>
          <input
            type="text"
            name="nip"
            value={student.nip}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 rounded-md border font-semibold ${
              isEditing ? "text-black border-blue-400" : "text-gray-800"
            }`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Batal
              </Button>
              <Button 
            className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSave}>Simpan</Button>
            </>
          ) : (
            <Button 
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
