"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api"; // import axios instance

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
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Guru = {
  id: number;
  nama: string;
  email: string;
  nip?: number;
};

export default function DataGuruPage() {
  const [dataGuru, setDataGuru] = useState<Guru[]>([]);
  const [newNama, setNewNama] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newNip, setNewNip] = useState("");
  const [password, setPassword] = useState("");

  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [query, setQuery] = useState("");

  // FETCH DATA
  async function fetchDataGuru() {
    try {
      const response = await api.get("/guru");
      setDataGuru(response.data);
    } catch (error) {
      console.error("Error fetching data guru:", error);
      toast.error("Gagal mengambil data guru");
    }
  }

  useEffect(() => {
    fetchDataGuru();
  }, []);

  // SAVE ADD
  const handleSaveAdd = async () => {
    if (!newNama || !newEmail || !newNip || !password) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      const response = await api.post("/guru", {
        nama: newNama,
        email: newEmail,
        nip: newNip,
        password: password,
      });

      setDataGuru([...dataGuru, response.data]); // tambahkan hasil dari backend
      setNewNama("");
      setNewEmail("");
      setNewNip("");
      setPassword("");
      toast.success("Data guru berhasil ditambahkan");
    } catch (error) {
      console.error("Error add guru:", error);
      toast.error("Gagal menambah data guru");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/guru/${id}`);
      setDataGuru(dataGuru.filter((guru) => guru.id !== id));
      toast.success("Data guru berhasil dihapus");
    } catch (error) {
      console.error("Error delete guru:", error);
      toast.error("Gagal menghapus data guru");
    }
  };

  // OPEN EDIT
  const handleOpenEdit = (guru: Guru) => {
    setEditingGuru(guru);
    setEditNama(guru.nama);
    setEditEmail(guru.email);
  };

  // SAVE EDIT
  const handleSaveEdit = async () => {
    if (!editingGuru) return;

    try {
      const response = await api.put(`/guru/${editingGuru.id}`, {
        nama: editNama,
        email: editEmail,
      });

      setDataGuru(
        dataGuru.map((guru) =>
          guru.id === editingGuru.id ? response.data : guru
        )
      );
      setEditingGuru(null);
      toast.success("Data guru berhasil diupdate");
    } catch (error) {
      console.error("Error update guru:", error);
      toast.error("Gagal mengupdate data guru");
    }
  };

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

      {/* Dialog Tambah */}
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="w-[150px] gap-2 bg-blue-600 text-white hover:bg-blue-700">
              Tambah Data Guru
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Data Guru</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nama Guru"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
            />
            <Input
              placeholder="NIP Guru"
              value={newNip}
              onChange={(e) => setNewNip(e.target.value)}
            />
            <Input
              placeholder="Email Guru"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSaveAdd}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

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

                  {/* AlertDialog untuk Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus {guru.nama}?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(guru.id)}>
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

      {/* Dialog Edit */}
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
