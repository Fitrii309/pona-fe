"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

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
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


enum JenisKelamin {
  LAKI_LAKI = "LAKI_LAKI",
  PEREMPUAN = "PEREMPUAN",
}

interface Guru {
  id_guru: number;
  nama: string;
  nip: number;
  jenis_kelamin: JenisKelamin;
}

export default function GuruPage() {
  const [dataGuru, setDataGuru] = useState<Guru[]>([]);
  const [search, setSearch] = useState("");

  // Tambah Guru
  const [newNama, setNewNama] = useState("");
  const [newNip, setNewNip] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState<JenisKelamin | "">("");

  // Edit Guru
  const [editId, setEditId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editNip, setEditNip] = useState("");
  const [editJenisKelamin, setEditJenisKelamin] = useState<JenisKelamin | "">("");

  // Fetch data guru
  const fetchGuru = async () => {
    try {
      const response = await api.get("/guru");
      setDataGuru(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil data guru");
    }
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  // Tambah data guru
  const handleSaveAdd = async () => {
    if (!newNama || !newNip || !jenisKelamin) {
      toast.error("Lengkapi semua field!");
      return;
    }

    try {
      const guruResponse = await api.post("/guru", {
        nama: newNama,
        nip: Number(newNip),
        jenis_kelamin: jenisKelamin, 
      });

      setDataGuru([...dataGuru, guruResponse.data]);
      setNewNama("");
      setNewNip("");
      setJenisKelamin("");
      toast.success("Guru berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan guru");
    }
  };

  // Edit data guru
  const handleSaveEdit = async () => {
    if (!editNama || !editNip || !editJenisKelamin) {
      toast.error("Lengkapi semua field!");
      return;
    }

    try {
      const guruResponse = await api.put(`/guru/${editId}`, {
        nama: editNama,
        nip: Number(editNip),
        jenis_kelamin: editJenisKelamin,
      });

      setDataGuru(
        dataGuru.map((g) => (g.id_guru === editId ? guruResponse.data : g))
      );
      setEditId(null);
      setEditNama("");
      setEditNip("");
      setEditJenisKelamin("");
      toast.success("Guru berhasil diperbarui");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengedit guru");
    }
  };

  // Hapus data guru
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus guru ini?")) return;

    try {
      await api.delete(`/guru/${id}`);
      setDataGuru(dataGuru.filter((g) => g.id_guru !== id));
      toast.success("Guru berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus guru");
    }
  };

  const [query, setQuery] = useState("");
  const filteredGuru = dataGuru.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(query.toLowerCase()) ||
      guru.nip.toString().includes(query.toLowerCase()) ||
      guru.jenis_kelamin.toLowerCase().includes(query.toLowerCase())
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

      <div className="border-b border-gray-300"></div>

      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">List Data Guru</h2>
      </div>

      {/* Tombol Tambah */}
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="w-[150px] gap-2 bg-blue-600 text-white hover:bg-blue-700">
              Tambah Data Guru
            </Button>
          </DialogTrigger>
        </div>

        {/* Dialog Tambah */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Guru</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nama Guru"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
            />
            <Input
              placeholder="NIP"
              type="number"
              value={newNip}
              onChange={(e) => setNewNip(e.target.value)}
            />
            <Select
              onValueChange={(val) => setJenisKelamin(val as JenisKelamin)}
              value={jenisKelamin || undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={JenisKelamin.LAKI_LAKI}>
                  Laki-Laki
                </SelectItem>
                <SelectItem value={JenisKelamin.PEREMPUAN}>
                  Perempuan
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSaveAdd}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table Guru */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>NIP</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGuru.map((guru) => (
            <TableRow key={guru.id_guru} className="font-medium">
              <TableCell>{guru.nama}</TableCell>
              <TableCell>{guru.nip}</TableCell>
              <TableCell>
                {guru.jenis_kelamin === JenisKelamin.LAKI_LAKI
                  ? "Laki-Laki"
                  : "Perempuan"}
              </TableCell>
              <TableCell className="space-x-2">
                {/* Edit Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditId(guru.id_guru);
                        setEditNama(guru.nama);
                        setEditNip(guru.nip.toString());
                        setEditJenisKelamin(guru.jenis_kelamin);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Guru</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Nama Guru"
                        value={editNama}
                        onChange={(e) => setEditNama(e.target.value)}
                      />
                      <Input
                        placeholder="NIP"
                        type="number"
                        value={editNip}
                        onChange={(e) => setEditNip(e.target.value)}
                      />
                      <Select
                        onValueChange={(val) =>
                          setEditJenisKelamin(val as JenisKelamin)
                        }
                        value={editJenisKelamin || undefined}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value={JenisKelamin.LAKI_LAKI}>
                            Laki-Laki
                          </SelectItem>
                          <SelectItem value={JenisKelamin.PEREMPUAN}>
                            Perempuan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleSaveEdit}>Simpan</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(guru.id_guru)}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
