"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
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
  const [newNip, setNewNip] = useState("");
  const [password, setPassword] = useState("");

  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [query, setQuery] = useState("");

  // SAVE ADD
  const handleSaveAdd = () => {
    if (!newNama || !newEmail || !newNip || !password) return;
    const newGuru: Guru = {
      id: Date.now(),
      nama: newNama,
      email: newEmail,
    };
    setDataGuru([...dataGuru, newGuru]);
    setNewNama("");
    setNewEmail("");
    setNewNip("");
    setPassword("");
  };

  // DELETE
  const handleDelete = (id: number) => {
    setDataGuru(dataGuru.filter((guru) => guru.id !== id));
  };

  // OPEN EDIT
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
    setEditingGuru(null);
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
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(guru.id);
                            toast.success("Data Guru Berhasil Dihapus", {
                              description: `Data guru ${guru.nama} telah dihapus`,
                            });
                          }}
                        >
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
