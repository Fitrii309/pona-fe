"use client";

import React, { useState } from "react";
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
 
const frameworks = [
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
  },
]
 
export default function TambahPoinPage() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

    return (
    <div className="flex-1 pt-2 px-4">
        <h1 className="text-2xl font-bold mb-4">Tambah Poin Kebaikan</h1>
        <form className="space-y-4">
          <div className="flex flex-col space-y-3 m-3">
            <label className="mb-1 font-medium">Nama Siswa</label>
            <Input type="text" placeholder="Nama Siswa" className="w-[400px] h-[50px] bg-white" /> 
            <div className="flex flex-row space-x-3 gap-4">
              <div>
                <label className="mb-1 font-medium">Kelas</label>
                <Input type="text" placeholder="Kelas" className="w-[100px] h-[50px] bg-white" />
              </div>
              <div>
                <label className="mb-1 font-medium">Jurusan</label>
                <Input type="text" placeholder="Jurusan" className="w-[270px] h-[50px] bg-white" />
              </div>
            </div>
            
            <label className="mb-1 font-medium">Pilihan Kebaikan </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] h-[50px] justify-between"
                >
                  {value? frameworks.find((framework) => framework.value === value)?.label: "Select Kebaikan"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Kebaikan..." />
                <CommandList>
                <CommandEmpty>Select Kebaikan</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  }}
                >
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")}
                />
                {framework.label}
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
              className="w-[400px] bg-white mb-5"/>

            <Button variant="default" className="w-[400px]">Submit</Button>
          </div>
        </form>
      </div>
    );
  }

