"use client"; // wajib jika pakai useState/useEffect

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type GuruBio = {
  id_guru: number;
  nama: string;
  nip: number;
  email?: string;
  avatar?: string;
};

export default function GuruProfilePage() { // ✅ Harus fungsi React
  const [guru, setGuru] = useState<GuruBio | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const res = await fetch("http://localhost:3001/bio/GURU", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error("Gagal fetch data guru");
        const data = await res.json();
        setGuru(data);
      } catch (err) {
        console.error(err);
        toast.error("Gagal mengambil data guru");
      }
    };
    fetchGuru();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!guru) return;
    setGuru({ ...guru, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!guru) return;
    try {
      const res = await fetch("http://localhost:3001/bio/GURU", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ nama: guru.nama, nip: guru.nip }),
      });
      if (!res.ok) throw new Error("Gagal update data guru");
      const updated = await res.json();
      setGuru(updated);
      setIsEditing(false);
      toast.success("Data guru berhasil diperbarui ✅");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengupdate data guru");
    }
  };

  if (!guru) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center pb-10">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Profile Guru</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden">
            <Image
              src={guru.avatar || "/pp.jpeg"}
              alt={guru.nama || "Avatar guru"}
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={guru.nama}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 rounded-md border font-semibold ${
              isEditing ? "text-black border-blue-400" : "text-gray-800"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">NIP</label>
          <input
            type="text"
            name="nip"
            value={guru.nip}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 rounded-md border font-semibold ${
              isEditing ? "text-black border-blue-400" : "text-gray-800"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">Email</label>
          <input
            type="email"
            value={guru.email || ""}
            readOnly
            className="w-full px-3 py-2 rounded-md border text-gray-800 font-semibold bg-gray-100"
          />
        </div>

        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Batal</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSave}>Simpan</Button>
            </>
          ) : (
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
