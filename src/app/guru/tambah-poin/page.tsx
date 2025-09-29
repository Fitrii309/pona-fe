"use client";

import React, { useState, useEffect } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TambahPoinPage() {
  const [openSiswa, setOpenSiswa] = useState(false);
  const [valueSiswa, setValueSiswa] = useState("");
  const [openKebaikan, setOpenKebaikan] = useState(false);
  const [valueKebaikan, setValueKebaikan] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // state untuk data dari API
  const [siswa, setSiswa] = useState<any[]>([]);
  const [kebaikan, setKebaikan] = useState<any[]>([]);

  // 🔹 ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSiswa = await fetch("http://localhost:3001/siswa", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const dataSiswa = await resSiswa.json();
        setSiswa(
          dataSiswa.map((s: any) => ({
            value: s.id_siswa.toString(),
            label: s.nama,
          }))
        );

        const resKategori = await fetch("http://localhost:3001/kategori-poin", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const dataKategori = await resKategori.json();
        setKebaikan(
          dataKategori.map((k: any) => ({
            value: k.id_kategori.toString(),
            label: k.nama_kategori,
          }))
        );
      } catch (err) {
        console.error("Gagal fetch data", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 submit ke API NestJS
  const handleSubmit = async () => {
    if (!valueSiswa || !valueKebaikan) {
      alert("Pilih siswa dan kebaikan terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("user_siswa", valueSiswa);
    formData.append("kategori_id", valueKebaikan);
    if (file) formData.append("foto", file);

    try {
      const res = await fetch("http://localhost:3001/poin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal menambahkan poin");
      const data = await res.json();
      alert("Berhasil tambah poin ✅");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Error saat submit");
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center pb-10">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">
          Tambah Poin Kebaikan
        </h2>
      </div>

      <div className="bg-white rounded-xl w-[470px] shadow-sm p-5">
        <div className="flex flex-col space-y-3 m-3">
          {/* Pilih Siswa */}
          <label className="mb-1 font-medium">Pilih Nama Siswa</label>
          <Popover open={openSiswa} onOpenChange={setOpenSiswa}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSiswa}
                className="w-[400px] h-[50px] justify-between bg-gray-100"
              >
                {valueSiswa
                  ? siswa.find((s) => s.value === valueSiswa)?.label
                  : "Select Siswa"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Siswa..." />
                <CommandList>
                  <CommandEmpty>Select Siswa</CommandEmpty>
                  <CommandGroup>
                    {siswa.map((s) => (
                      <CommandItem
                        key={s.value}
                        value={s.value}
                        onSelect={(currentValue) => {
                          setValueSiswa(
                            currentValue === valueSiswa ? "" : currentValue
                          );
                          setOpenSiswa(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueSiswa === s.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {s.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Pilih Kebaikan */}
          <label className="mb-1 font-medium">Pilih Kategori Kebaikan </label>
          <Popover open={openKebaikan} onOpenChange={setOpenKebaikan}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openKebaikan}
                className="w-[400px] h-[50px] justify-between bg-gray-100"
              >
                {valueKebaikan
                  ? kebaikan.find((k) => k.value === valueKebaikan)?.label
                  : "Select Kebaikan"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Kebaikan..." />
                <CommandList>
                  <CommandEmpty>Select Kebaikan</CommandEmpty>
                  <CommandGroup>
                    {kebaikan.map((k) => (
                      <CommandItem
                        key={k.value}
                        value={k.value}
                        onSelect={(currentValue) => {
                          setValueKebaikan(
                            currentValue === valueKebaikan ? "" : currentValue
                          );
                          setOpenKebaikan(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueKebaikan === k.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {k.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Upload Foto */}
          <label className="mb-1 font-medium">Dokumentasi</label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-[400px] bg-gray-100 mb-5"
          />

          {/* Submit */}
          <Button variant="default" className="w-[400px]" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
