"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type murid = {
  id: string;
  nama: string;
  email?: string;
  nisn: string;
  kelas: string;
  jurusan: string;
};

export default function DataMuridPage() {
  // data awal siswa
  const [dataMurid, setDataMurid] = useState<murid[]>([
    { id: crypto.randomUUID(), nama: "Kania Majesty Swambayong", nisn: "23226967", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Ridho Tambayong Saputra", nisn: "12345678", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Fitri Ramadani Ambayong", nisn: "23226963", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Dihya Ibnu Ambayong Ambayong", nisn: "87654321", kelas: "XII", jurusan: "RPL" },
  ]);

  // state untuk tambah siswa
  const [newNama, setNewNama] = useState("");
  const [newNisn, setNewNisn] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [newKelas, setNewKelas] = useState("");
  const [newJurusan, setNewJurusan] = useState("");


  // state untuk edit siswa
  const [editingMurid, setEditingMurid] = useState<murid | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editNisn, setEditNisn] = useState("");
  const [editKelas, setEditKelas] = useState("");
  const [editJurusan, setEditJurusan] = useState("");

  // state untuk search
  const [query, setQuery] = useState("");

  // CREATE
    const handleAddMurid = () => {
    if (!newNama || !newEmail || !Password || !newNisn || !newKelas || !newJurusan) return;
    const newMurid: murid = {
      id: crypto.randomUUID(),
      nama: newNama,
      email: newEmail,
      nisn: newNisn,
      kelas: newKelas,
      jurusan: newJurusan,
    };
    setDataMurid([...dataMurid, newMurid]);
    setNewNama("");
    setNewEmail("");
    setNewNisn("");
    setPassword("");
  };
  // DELETE
  const handleDelete = (id: string) => {
    setDataMurid(dataMurid.filter((murid) => murid.id !== id));
  };

  // OPEN EDIT MODAL
  const handleOpenEdit = (murid: murid) => {
    setEditingMurid(murid);
    setEditNama(murid.nama);
    setEditNisn(murid.nisn);
    setEditKelas(murid.kelas);
    setEditJurusan(murid.jurusan);
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (!editingMurid) return;
    setDataMurid(
      dataMurid.map((murid) =>
        murid.id === editingMurid.id
          ? { ...murid, nama: editNama, nisn: editNisn, kelas: editKelas, jurusan: editJurusan }
          : murid
      )
    );
    setEditingMurid(null);
  };

  // SEARCH filter
  const filteredSiswa = dataMurid.filter(
    (murid) =>
      murid.nama.toLowerCase().includes(query.toLowerCase()) ||
      murid.nisn.toLowerCase().includes(query.toLowerCase()) ||
      murid.kelas.toLowerCase().includes(query.toLowerCase()) ||
      murid.jurusan.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-7">
      {/* Search */}
      <div className="relative rounded-md">
        <Search className="absolute left-3 top-3" />
        <Input
          placeholder="Search Nama/NISN/Kelas/Jurusan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 py-3 text-base h-12 bg-gray-200"
        />
      </div>

      <div className="border-b border-gray-300"></div>

      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">List Data Murid</h2>
      </div>

      {/* Form Tambah */}
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="w-[150px] gap-2 bg-blue-600 text-white hover:bg-blue-700">
              Tambah Data Murid
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Data Murid</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nama Murid"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
            />
            <Input
              placeholder="NISN Murid"
              value={newNisn}
              onChange={(e) => setNewNisn(e.target.value)}
            />
            <Input
              placeholder="Kelas"
              value={newKelas}
              onChange={(e) => setNewKelas(e.target.value)}
            />
            <Input
              placeholder="Jurusan"
              value={newJurusan}
              onChange={(e) => setNewJurusan(e.target.value)}
            />
            <Input
              placeholder="Email Murid"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleAddMurid}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSiswa.map((murid, index) => (
            <TableRow key={murid.id} className="font-medium">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{murid.nama}</TableCell>
              <TableCell>{murid.nisn}</TableCell>
              <TableCell>{murid.kelas}</TableCell>
              <TableCell>{murid.jurusan}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="secondary" onClick={() => handleOpenEdit(murid)}>Edit</Button>

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
                          Yakin ingin menghapus {murid.nama}?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(murid.id);
                            toast.success("Data Murid Berhasil Dihapus", {
                              description: `Data guru ${murid.nama} telah dihapus`,
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
          ))}
        </TableBody>
      </Table>

      {/* Dialog Edit */}
      <Dialog open={!!editingMurid} onOpenChange={(open) => !open && setEditingMurid(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Murid</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input placeholder="Nama" value={editNama} onChange={(e) => setEditNama(e.target.value)} />
            <Input placeholder="NISN" value={editNisn} onChange={(e) => setEditNisn(e.target.value)} />
            <Input placeholder="Kelas" value={editKelas} onChange={(e) => setEditKelas(e.target.value)} />
            <Input placeholder="Jurusan" value={editJurusan} onChange={(e) => setEditJurusan(e.target.value)} />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setEditingMurid(null)}>Batal</Button>
            <Button onClick={handleSaveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
