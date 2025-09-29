"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataKebaikanPage() {
  const [dataKebaikan, setDataKebaikan] = useState<any[]>([]);
  const [newKategori, setNewKategori] = useState("");
  const [newPoin, setNewPoin] = useState("");

  // ambil data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/kategori-poin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Gagal ambil data");

        const data = await res.json();
        setDataKebaikan(data);
      } catch (err) {
        console.error(err);
        toast.error("Gagal ambil data");
      }
    };

    fetchData();
  }, []);

  // tambah data
  const handleAddKebaikan = async () => {
    if (!newKategori || !newPoin) {
      toast.error("Semua field harus diisi");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/kategori-poin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama_kategori: newKategori,
          nilai_default: parseInt(newPoin),
        }),
      });

      if (!res.ok) throw new Error("Gagal tambah data");
      const data = await res.json();

      setDataKebaikan([...dataKebaikan, data]);
      setNewKategori("");
      setNewPoin("");
      toast.success("Data kebaikan berhasil ditambahkan");
    } catch (err) {
      console.error(err);
      toast.error("Gagal simpan data");
    }
  };

  return (
    <div className="flex flex-col space-y-7">
      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">
          List Kategori Kebaikan
        </h2>
      </div>

      {/* Form Tambah */}
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="w-[180px] h-10 gap-2 bg-blue-600 text-white hover:bg-blue-700">
              Tambah Data Kebaikan
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Data</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nama Kebaikan"
              value={newKategori}
              onChange={(e) => setNewKategori(e.target.value)}
            />
            <Input
              placeholder="Poin Kebaikan"
              value={newPoin}
              onChange={(e) => setNewPoin(e.target.value)}
              type="number"
            />
            <Button onClick={handleAddKebaikan}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabel */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Poin Kebaikan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataKebaikan.length > 0 ? (
            dataKebaikan.map((kebaikan, index) => (
              <TableRow key={kebaikan.id_kategori} className="font-medium">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{kebaikan.nama_kategori}</TableCell>
                <TableCell>
                  <span className="px-5 py-1 rounded-lg bg-yellow-400 text-[16px] font-semibold">
                    {kebaikan.nilai_default}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6"
              >
                Data tidak ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
