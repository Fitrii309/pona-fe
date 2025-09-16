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

type Siswa = {
  id: string;
  nama: string;
  nisn: string;
  kelas: string;
  jurusan: string;
};

export default function DataSiswaPage() {
  // data awal siswa
  const [dataSiswa, setDataSiswa] = useState<Siswa[]>([
    { id: crypto.randomUUID(), nama: "Kania Majesty Swambayong", nisn: "23226967", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Ridho Tambayong Saputra", nisn: "12345678", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Fitri Ramadani Ambayong", nisn: "23226963", kelas: "XII", jurusan: "RPL" },
    { id: crypto.randomUUID(), nama: "Dihya Ibnu Ambayong Ambayong", nisn: "87654321", kelas: "XII", jurusan: "RPL" },
  ]);

  // state untuk tambah siswa
  const [newNama, setNewNama] = useState("");
  const [newNisn, setNewNisn] = useState("");
  const [newKelas, setNewKelas] = useState("");
  const [newJurusan, setNewJurusan] = useState("");

  // state untuk edit siswa
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editNisn, setEditNisn] = useState("");
  const [editKelas, setEditKelas] = useState("");
  const [editJurusan, setEditJurusan] = useState("");

  // state untuk search
  const [query, setQuery] = useState("");

  // CREATE
  const handleAddSiswa = () => {
    if (!newNama || !newNisn || !newKelas || !newJurusan) return;
    const newSiswa: Siswa = {
      id: crypto.randomUUID(),
      nama: newNama,
      nisn: newNisn,
      kelas: newKelas,
      jurusan: newJurusan,
    };
    setDataSiswa([...dataSiswa, newSiswa]);
    setNewNama(""); setNewNisn(""); setNewKelas(""); setNewJurusan("");
  };

  // DELETE
  const handleDelete = (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    setDataSiswa(dataSiswa.filter((siswa) => siswa.id !== id));
  };

  // OPEN EDIT MODAL
  const handleOpenEdit = (siswa: Siswa) => {
    setEditingSiswa(siswa);
    setEditNama(siswa.nama);
    setEditNisn(siswa.nisn);
    setEditKelas(siswa.kelas);
    setEditJurusan(siswa.jurusan);
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (!editingSiswa) return;
    setDataSiswa(
      dataSiswa.map((siswa) =>
        siswa.id === editingSiswa.id
          ? { ...siswa, nama: editNama, nisn: editNisn, kelas: editKelas, jurusan: editJurusan }
          : siswa
      )
    );
    setEditingSiswa(null);
  };

  // SEARCH filter
  const filteredSiswa = dataSiswa.filter(
    (siswa) =>
      siswa.nama.toLowerCase().includes(query.toLowerCase()) ||
      siswa.nisn.toLowerCase().includes(query.toLowerCase()) ||
      siswa.kelas.toLowerCase().includes(query.toLowerCase()) ||
      siswa.jurusan.toLowerCase().includes(query.toLowerCase())
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
        <h2 className="text-2xl font-medium text-gray-800">List Data Siswa</h2>
      </div>

      {/* Form Tambah */}
      <div className="flex gap-2 flex-wrap">
        <Input placeholder="Nama" value={newNama} onChange={(e) => setNewNama(e.target.value)} />
        <Input placeholder="NISN" value={newNisn} onChange={(e) => setNewNisn(e.target.value)} />
        <Input placeholder="Kelas" value={newKelas} onChange={(e) => setNewKelas(e.target.value)} />
        <Input placeholder="Jurusan" value={newJurusan} onChange={(e) => setNewJurusan(e.target.value)} />
        <Button type="button" onClick={handleAddSiswa}>Tambah</Button>
      </div>

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
          {filteredSiswa.map((siswa, index) => (
            <TableRow key={siswa.id} className="font-medium">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{siswa.nama}</TableCell>
              <TableCell>{siswa.nisn}</TableCell>
              <TableCell>{siswa.kelas}</TableCell>
              <TableCell>{siswa.jurusan}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="secondary" onClick={() => handleOpenEdit(siswa)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(siswa.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog Edit */}
      <Dialog open={!!editingSiswa} onOpenChange={(open) => !open && setEditingSiswa(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Siswa</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input placeholder="Nama" value={editNama} onChange={(e) => setEditNama(e.target.value)} />
            <Input placeholder="NISN" value={editNisn} onChange={(e) => setEditNisn(e.target.value)} />
            <Input placeholder="Kelas" value={editKelas} onChange={(e) => setEditKelas(e.target.value)} />
            <Input placeholder="Jurusan" value={editJurusan} onChange={(e) => setEditJurusan(e.target.value)} />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setEditingSiswa(null)}>Batal</Button>
            <Button onClick={handleSaveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
