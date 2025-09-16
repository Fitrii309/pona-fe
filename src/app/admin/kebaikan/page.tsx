"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataKebaikanPage() {
  const dataKebaikan = [
    { id: 1, nama: "Azmi Tambayong", nisn: "09090909090", poin: 45 },
    { id: 2, nama: "Nabieg When Y.H", nisn: "09090909091", poin: 70 },
    { id: 3, nama: "Zaggi Ezi Duta", nisn: "09090909092", poin: 85 },
    { id: 4, nama: "Dihya Ibnu B.D.G", nisn: "09090909093", poin: 60 },
    { id: 5, nama: "Ridho Zhafiera", nisn: "09090909094", poin: 95 },
  ];

  return (
    <div className="flex flex-col space-y-7">
      {/* Search bar */}
      <div className="relative rounded-md">
        <Search className="absolute left-3 top-3 text-gray-500" />
        <Input
          placeholder="Search Nama Murid..."
          className="pl-12 py-3 text-base h-12 bg-gray-200"
        />
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300"></div>

      {/* Judul */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">List Data Kebaikan</h2>
      </div>

      {/* Tabel */}
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Jumlah Poin Kebaikan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataKebaikan.map((murid, index) => (
            <TableRow key={murid.id} className="font-medium">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{murid.nama}</TableCell>
              <TableCell>{murid.nisn}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-lg ${
                    murid.poin >= 80
                      ? "bg-green-200 text-green-700"
                      : murid.poin >= 50
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {murid.poin}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
