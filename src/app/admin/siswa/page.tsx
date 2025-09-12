"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DataGuruPage() {
    return (
/* Div Search */
<div className="flex flex-col space-x-2 space-y-7">
    <div className="relative rounded-b-md">
        <Search className="absolute left-3 top-3" />
        <Input 
        placeholder="Search Nama Siswa..." 
        className="pl-12 py-3 text-base h-12 bg-gray-200" />
    </div>
    {/* Divier */}
    <div className="border-b border-gray-300"></div>

    <div className="flex items-center mb-4">
      {/* Garis kuning */}
      <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
  
      {/* Judul */}
      <h2 className="text-2xl font-medium text-gray-800">List Data Siswa</h2>
    </div>

    {/* Table */}
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">No.</TableHead>
      <TableHead>Nama</TableHead>
      <TableHead>NISN</TableHead>
      <TableHead>Kelas</TableHead>
      <TableHead>Jurusan</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="font-medium">
      <TableCell >1</TableCell>
      <TableCell>Kania Majesty Swambayong</TableCell>
      <TableCell>23226967</TableCell>
      <TableCell>XII</TableCell>
      <TableCell>RPL</TableCell>
    </TableRow>
    <TableRow className="font-medium">
      <TableCell>2</TableCell>
      <TableCell>Ridho Tambayong Saputra</TableCell>
      <TableCell>12345678</TableCell>
      <TableCell>XII</TableCell>
      <TableCell>RPL</TableCell>
    </TableRow>    
    <TableRow className="font-medium">
      <TableCell>3</TableCell>
      <TableCell>Fitri Ramadani Ambayong</TableCell>
      <TableCell>23226963</TableCell>
      <TableCell>XII</TableCell>
      <TableCell>RPL</TableCell>
    </TableRow>    
    <TableRow className="font-medium">
      <TableCell>4</TableCell>
      <TableCell>Dihya Ibnu Ambayong Ambayong</TableCell>
      <TableCell>87654321</TableCell>
      <TableCell>XII</TableCell>
      <TableCell>RPL</TableCell>
    </TableRow>
  </TableBody>
</Table>

</div>
    );
}
