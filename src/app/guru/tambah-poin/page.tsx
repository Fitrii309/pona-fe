"use client";

import React, {useState} from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const siswa = [
  {
    value: "Ridho Tambayong Saputra",
    label: "Ridho Tambayong Saputra",
  },
  {
    value: "Dihya Ibnu B. D. G",
    label: "Dihya Ibnu B. D. G",
  },
  {
    value: "Kania Majesty Swambayong",
    label: "Kania Majesty Swambayong",
  },
  {
    value: "ptrzz Tambayong",
    label: "ptrzz Tambayong",
  },
  {
    value: "Rdh Zhafiera",
    label: "Rdh Zhafiera",
  },
    {
    value: "naDihya Ibnu",
    label: "naDihya Ibnu",
  },
]
 

const kebaikan = [
  {
    value: "Rajin Piket",
    label: "Rajin Piket",
  },
  {
    value: "Membuang Sampah pada Tempatnya",
    label: "Membuang Sampah pada Tempatnya",
  },
  {
    value: "Rajin mengumpulkan Tugas",
    label: "Rajin mengumpulkan Tugas",
  },
  {
    value: "Ga pernah bolos",
    label: "Ga pernah bolos",
  },
  {
    value: "Suka menolong teman",
    label: "Suka menolong teman",
  },
    {
    value: "Rajin Mencuci Piring",
    label: "Rajin Mencuci Piring",
  },{
    value: "Yapping",
    label: "Yapping",
  },
]
 
export default function TambahPoinPage() {
  const [openSiswa, setOpenSiswa] = React.useState(false)
  const [valueSiswa, setValueSiswa] = React.useState("")
  const [openKebaikan, setOpenKebaikan] = React.useState(false)
  const [valueKebaikan, setValueKebaikan] = React.useState("")

    return (
    <div className="flex-1 ">
      <div className="flex items-center pb-10">
        <div className="w-2 h-9 bg-yellow-500 rounded mr-2"></div>
        <h2 className="text-2xl font-medium text-gray-800">Tambah Poin Kebaikan</h2>
      </div>
        <div className="bg-white rounded-xl w-[470px] shadow-sm p-5">
          <div className="flex flex-col space-y-3 m-3">
            <label className="mb-1 font-medium">Pilih Nama Siswa</label>
            <Popover open={openSiswa} onOpenChange={setOpenSiswa}>
              <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSiswa}
                className="w-[400px] h-[50px] justify-between bg-gray-100"
                >
                  {valueSiswa? siswa.find((siswa) => siswa.value === valueSiswa)?.label: "Select Siswa"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Siswa..." />
                <CommandList>
                <CommandEmpty>Select Siswa</CommandEmpty>
                <CommandGroup>
                  {siswa.map((siswa) => (
                <CommandItem
                  key={siswa.value}
                  value={siswa.value}
                  onSelect={(currentValue) => {
                  setValueSiswa(currentValue === valueSiswa ? "" : currentValue)
                  setOpenSiswa(false)
                  }}
                >
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", valueSiswa === siswa.value ? "opacity-100" : "opacity-0")}
                />
                {siswa.label}
                </CommandItem>
                ))}
                </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
            </Popover>
            <label className="mb-1 font-medium">Pilih Kategori Kebaikan </label>
            <Popover open={openKebaikan} onOpenChange={setOpenKebaikan}>
              <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={openKebaikan}
                className="w-[400px] h-[50px] justify-between bg-gray-100"
                >
                  {valueKebaikan? kebaikan.find((kebaikan) => kebaikan.value === valueKebaikan)?.label: "Select Kebaikan"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Kebaikan..." />
                <CommandList>
                <CommandEmpty>Select Kebaikan</CommandEmpty>
                <CommandGroup>
                  {kebaikan.map((kebaikan) => (
                <CommandItem
                  key={kebaikan.value}
                  value={kebaikan.value}
                  onSelect={(currentValue) => {
                  setValueKebaikan(currentValue === valueKebaikan ? "" : currentValue)
                  setOpenKebaikan(false)
                  }}
                >
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", valueKebaikan === kebaikan.value ? "opacity-100" : "opacity-0")}
                />
                {kebaikan.label}
                </CommandItem>
                ))}
                </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
            </Popover>

              <label className="mb-1 font-medium">Dokumentasi</label>
              <Input 
              id="picture" 
              type="file" 
              className="w-[400px] bg-gray-100 mb-5"/>

            <Button variant="default" className="w-[400px]">Submit</Button>
          </div>
        </div>
      </div>
    );
  }

