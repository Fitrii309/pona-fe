"use client";

import React from "react";
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
  const [dataKebaikan, setDataKebaikan] = React.useState([
    { id: 1, kategori: "Patuh Tata Tertib", poin: 20 },
    { id: 2, kategori: "Rajin Piket", poin: 10 },
    { id: 3, kategori: "Rajin Sholat", poin: 20 },
    { id: 4, kategori: "Disiplin", poin: 15 },
    { id: 5, kategori: "Rajin menolong teman", poin: 10 },
  ]);

  const [newKategori, setNewKategori] = React.useState("");
  const [newPoin, setNewPoin] = React.useState("");

  const handleAddKebaikan = () => {
    if (!newKategori || !newPoin) {
      toast.error("Semua field harus diisi");
      return;
    }

    const newKebaikan = {
      id: dataKebaikan.length + 1,
      kategori: newKategori,
      poin: parseInt(newPoin),
    };

    setDataKebaikan([...dataKebaikan, newKebaikan]);
    setNewKategori("");
    setNewPoin("");
    toast.success("Data kebaikan berhasil ditambahkan");
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
                  <span
                    className="px-5 py-1 rounded-lg bg-yellow-400 text-[16px] font-semibold"
                  >
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
