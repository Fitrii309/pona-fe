"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Guru = {
  id: number;
  nama: string;
  email: string;
};

export default function DataGuruPage() {
  const [dataGuru, setDataGuru] = useState<Guru[]>([
    { id: 1, nama: "Jumiati Muchtar", email: "zoemmy@gmail.com" },
    { id: 2, nama: "Ari Wisnu", email: "arwis@gmail.com" },
    { id: 3, nama: "Eko Prihatin", email: "ekopri@gmail.com" },
    { id: 4, nama: "Suhartini", email: "tinisuhar@gmail.com" },
    { id: 5, nama: "Rizka Abungambi", email: "ngambi@gmail.com" },
    { id: 6, nama: "Alam Keliling Umar", email: "umaralam@gmail.com" },
  ]);

  const [newNama, setNewNama] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // state untuk Edit
  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // state untuk Search
  const [query, setQuery] = useState("");

  // CREATE
  const handleAddGuru = () => {
    if (!newNama || !newEmail) return;
    const newGuru = {
      id: Date.now(), // id unik
      nama: newNama,
      email: newEmail,
    };
    setDataGuru([...dataGuru, newGuru]);
    setNewNama("");
    setNewEmail("");
  };

  // DELETE
  const handleDelete = (id: number) => {
    setDataGuru(dataGuru.filter((guru) => guru.id !== id));
  };

  // OPEN EDIT MODAL
  const handleOpenEdit = (guru: Guru) => {
    setEditingGuru(guru);
    setEditNama(guru.nama);
    setEditEmail(guru.email);
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (!editingGuru) return;
    setDataGuru(
      dataGuru.map((guru) =>
        guru.id === editingGuru.id
          ? { ...guru, nama: editNama, email: editEmail }
          : guru
      )
    );
    setEditingGuru(null); // tutup modal
  };

  // FILTER data sesuai query
  const filteredGuru = dataGuru.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(query.toLowerCase()) ||
      guru.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-7">
      {/* Search */}
      <div className="relative rounded-md">
        <Search className="absolute left-3 top-3" />
        <Input
          placeholder="Search Nama Guru..."
          className="pl-12 py-3 text-base h-12 bg-gray-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300"></div>

      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">List Data Guru</h2>
      </div>

      {/* Form Tambah Guru */}
      <div className="flex gap-2">
        <Input
          placeholder="Nama Guru"
          value={newNama}
          onChange={(e) => setNewNama(e.target.value)}
        />
        <Input
          placeholder="Email Guru"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Button onClick={handleAddGuru}>Tambah</Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGuru.length > 0 ? (
            filteredGuru.map((guru, index) => (
              <TableRow key={guru.id} className="font-medium">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{guru.nama}</TableCell>
                <TableCell>{guru.email}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEdit(guru)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(guru.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Data tidak ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog untuk Edit */}
      <Dialog open={!!editingGuru} onOpenChange={() => setEditingGuru(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Guru</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Nama Guru"
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
            />
            <Input
              placeholder="Email Guru"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setEditingGuru(null)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
