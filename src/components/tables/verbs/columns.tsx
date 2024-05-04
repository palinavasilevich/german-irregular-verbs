"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoreHorizontal } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";

export type Verb = {
  infinitive: string;
  pastSimple: string;
  pastParticle: string;
  translation: string;
  group: string;
};

export const columns: ColumnDef<Verb>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "infinitive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-base font-bold capitalize p-0 m-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Infinitiv
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pastSimple",
    header: () => (
      <div className="text-base font-bold capitalize">Präteritum</div>
    ),
  },
  {
    accessorKey: "pastParticle",
    header: () => (
      <div className="text-base font-bold capitalize">Partizip II</div>
    ),
  },
  {
    accessorKey: "translation",
    header: () => (
      <div className="text-base font-bold capitalize">Übersetzung</div>
    ),
  },
  {
    accessorKey: "group",
    header: ({ table }) => {
      const groups = [...new Set(table.options.data.map((item) => item.group))];
      return (
        <Select
          onValueChange={(value: string) => {
            table.getColumn("group")?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[100px] border-none outline-none text-base font-bold capitalize">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group} value={group} className="cursor-pointer">
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      );
    },
  },
];
