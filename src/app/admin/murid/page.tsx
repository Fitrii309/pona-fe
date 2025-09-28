"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api"; // gunakan api.ts biar token otomatis
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
enum Jurusan{
  TKJ = "TKJ",
  RPL = "RPL",
  DKV = "DKV",
}
enum Kelas {
  X = "X",
  XI = "XI",
  XII = "XII",
}


interface Murid {
  id_siswa: number;
  nama: string;
  nisn: number;
  kelas: Kelas;
  jurusan: Jurusan;
  jenis_kelamin: JenisKelamin;
}

export default function DataMuridPage() {
  const [dataMurid, setDataMurid] = useState<Murid[]>([]);

  // Form tambah
  const [newNama, setNewNama] = useState("");
  const [newNisn, setNewNisn] = useState("");
  const [newKelas, setNewKelas] = useState<Kelas | "">("");("");
  const [jenisKelamin, setJenisKelamin] = useState<JenisKelamin | "">("");
  const [jurusan, setJurusan] = useState<Jurusan | "">("");

  // Form edit
  const [editId, setEditId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editNisn, setEditNisn] = useState("");
  const [editKelas, setEditKelas] = useState<Kelas | "">("");
  const [editJurusan, setEditJurusan] = useState<Jurusan | "">("");
  const [editJenisKelamin, setEditJenisKelamin] = useState<JenisKelamin | "">("");

  // Pencarian
  const [query, setQuery] = useState("");

  // Ambil data murid
  async function fetchDataMurid() {
    try {
      const response = await api.get("/siswa");
      setDataMurid(response.data);
    } catch (error: any) {
      console.error("Error fetching murid:", error);
      toast.error(error.response?.data?.message || "Gagal mengambil data murid");
    }
  }

  useEffect(() => {
    fetchDataMurid();
  }, []);

  // Tambah murid
  const handleAddMurid = async () => {
    if (!newNama || !newNisn || !newKelas || !jenisKelamin || !jurusan) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      const response = await api.post("/siswa", {
        nama: newNama,
        nisn: Number(newNisn),
        kelas: newKelas,
        jenis_kelamin: jenisKelamin,
        jurusan: jurusan, 
      });

      setDataMurid([...dataMurid, response.data]);
      setNewNama("");
      setNewNisn("");
      setNewKelas("");
      setJurusan ("");
      setJenisKelamin("");
      toast.success("Data murid berhasil ditambahkan");
    } catch (error: any) {
      console.error("Error add murid:", error);
      toast.error(error.response?.data?.message || "Gagal menambah data murid");
    }
  };

  // Hapus murid
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/siswa/${id}`);
      setDataMurid(dataMurid.filter((murid) => murid.id_siswa !== id));
      toast.success("Data murid berhasil dihapus");
    } catch (error: any) {
      console.error("Error delete murid:", error);
      toast.error(error.response?.data?.message || "Gagal menghapus data murid");
    }
  };

  // Buka edit murid
  const handleOpenEdit = (murid: Murid) => {
    setEditId(murid.id_siswa);
    setEditNama(murid.nama);
    setEditNisn(murid.nisn.toString());
    setEditKelas(murid.kelas);
    setEditJurusan(murid.jurusan);
    setEditJenisKelamin(murid.jenis_kelamin);
  };

  // Simpan edit murid
  const handleSaveEdit = async () => {
    if (!editId) return;

    if (!editNama || !editNisn || !editKelas || !editJenisKelamin || !editJurusan) {
      toast.error("Semua field edit harus diisi!");
      return;
    }

    try {
      const response = await api.patch(`/siswa/${editId}`, {
        nama: editNama,
        nisn: Number(editNisn),
        kelas: editKelas,
        jurusan: editJurusan,
        jenis_kelamin: editJenisKelamin,
      });

      setDataMurid(
        dataMurid.map((m) => (m.id_siswa === editId ? response.data : m))
      );
      toast.success("Murid berhasil diperbarui");
      setEditId(null);
    } catch (error: any) {
      console.error("Error update murid:", error);
      toast.error(error.response?.data?.message || "Gagal mengupdate data murid");
    }
  };

  // Filter pencarian
  const filteredMurid = dataMurid.filter((murid) => {
    const q = query.toLowerCase();
    return (
      murid.nama.toLowerCase().includes(q) ||
      murid.nisn.toString().includes(q) ||
      murid.kelas.toLowerCase().includes(q) ||
      murid.jurusan.toLowerCase().includes(q)  
    );
  });

  return (
    <div className="flex flex-col space-y-7">
      {/* Search */}
      <div className="relative rounded-md">
        <Search className="absolute left-3 top-3" />
        <Input
          placeholder="Search Nama / NISN / Kelas / Email..."
          className="pl-12 py-3 text-base h-12 bg-gray-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="border-b border-gray-300"></div>

      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">List Data Murid</h2>
      </div>

      {/* Tombol Tambah */}
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="w-[180px] gap-2 bg-blue-600 text-white hover:bg-blue-700">
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
            <Select
              onValueChange={(val) => setNewKelas(val as Kelas)}
              value={newKelas}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={Kelas.X}>
                  X
                </SelectItem> 
                <SelectItem value={Kelas.XI}>
                  XI
                </SelectItem>
                <SelectItem value={Kelas.XII}>
                  XII
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) => setJurusan(val as Jurusan)}
              value={jurusan}
            > 
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jurusan" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={Jurusan.TKJ}>
                  TKJ
                </SelectItem> 
                <SelectItem value={Jurusan.RPL}>
                  RPL
                </SelectItem>
                <SelectItem value={Jurusan.DKV}>
                  DKV
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) =>
              setJenisKelamin(val as JenisKelamin)
              }
              value={jenisKelamin}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={JenisKelamin.LAKI_LAKI}>
                  LAKI_LAKI
                </SelectItem>
                <SelectItem value={JenisKelamin.PEREMPUAN}>
                  PEREMPUAN
                </SelectItem>
              </SelectContent>
            </Select>
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
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMurid.length > 0 ? (
            filteredMurid.map((murid, index) => (
              <TableRow key={murid.id_siswa} className="font-medium">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{murid.nama}</TableCell>
                <TableCell>{murid.nisn}</TableCell>
                <TableCell>{murid.kelas}</TableCell>
                <TableCell>{murid.jurusan}</TableCell>
                <TableCell>{murid.jenis_kelamin}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleOpenEdit(murid)}
                  >
                    Edit
                  </Button>

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
                          onClick={() => handleDelete(murid.id_siswa)}
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
              <TableCell colSpan={7} className="text-center text-gray-500">
                Data tidak ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog Edit */}
      <Dialog open={!!editId} onOpenChange={(open) => !open && setEditId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Murid</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Nama"
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
            />
            <Input
              placeholder="NISN"
              value={editNisn}
              onChange={(e) => setEditNisn(e.target.value)}
            />
            <Select
              onValueChange={(val) => setEditKelas(val as Kelas)}
              value={editKelas}
            > 
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={Kelas.X}>
                  X
                </SelectItem>
                <SelectItem value={Kelas.XI}>
                  XI
                </SelectItem>
                <SelectItem value={Kelas.XII}>
                  XII
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) => setEditJurusan(val as Jurusan)}
              value={editJurusan}
            > 
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jurusan" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={Jurusan.TKJ}>
                  TKJ
                </SelectItem> 
                <SelectItem value={Jurusan.RPL}>
                  RPL
                </SelectItem>
                <SelectItem value={Jurusan.DKV}>
                  DKV
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) => setEditJenisKelamin(val as JenisKelamin)}
              value={editJenisKelamin}
            > 
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value={JenisKelamin.LAKI_LAKI}>
                  LAKI_LAKI
                </SelectItem>
                <SelectItem value={JenisKelamin.PEREMPUAN}>
                  PEREMPUAN
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setEditId(null)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
