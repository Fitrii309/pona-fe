"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
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

type Kebaikan = {
  id: number;
  kategori: string;
  poin: number;
};

export default function DataKebaikanPage() {
  const [newKategori, setNewKategori] = useState("");
  const [newPoin, setNewPoin] = useState("");
  const [dataKebaikan, setDataKebaikan] = useState<Kebaikan[]>([]);

  // FETCH DATA dari backend
  async function fetchKebaikan() {
    try {
      const response = await axios.get("http://localhost:3001/kategori-poin");
      setDataKebaikan(response.data);
    } catch (error) {
      console.error("Error fetching kebaikan data:", error);
      toast.error("Gagal mengambil data kebaikan");
    }
  }

  useEffect(() => {
    fetchKebaikan();
  }, []);

  // ADD DATA ke backend
  const handleAddKebaikan = async () => {
    if (!newKategori || !newPoin) {
      toast.error("Semua field harus diisi");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/kategori-poin", {
        kategori: newKategori,
        poin: parseInt(newPoin),
      });

      // update state setelah berhasil tambah
      setDataKebaikan([...dataKebaikan, response.data]);
      setNewKategori("");
      setNewPoin("");
      toast.success("Data kebaikan berhasil ditambahkan");
    } catch (error) {
      console.error("Error add kebaikan:", error);
      toast.error("Gagal menambahkan data kebaikan");
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
              <TableRow key={kebaikan.id} className="font-medium">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{kebaikan.kategori}</TableCell>
                <TableCell>
                  <span className="px-5 py-1 rounded-lg bg-yellow-400 text-[16px] font-semibold">
                    {kebaikan.poin}
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
