"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { CaretSortIcon } from "@radix-ui/react-icons";

import MultiSelect from "@/components/multiSelect";
import FavoriteVerbsCell from "@/components/favoriteVerbsCell";
import VerbTableCell from "@/components/verbTableCell";

export type Verb = {
  infinitive: string;
  pastSimple: string;
  pastParticle: string;
  translation: string;
  group: string;
};

const selectFilterFn: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (value === undefined) {
    return false;
  } else {
    if (value.length === 0) return true;

    return value.includes(row.original.group);
  }
};

export function getColumns(): ColumnDef<Verb>[] {
  return [
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
            className="text-sm md:text-base font-bold capitalize p-0 m-0 hover:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Infinitiv
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const verb = row.original.infinitive;

        return <VerbTableCell verb={verb} />;
      },
    },
    {
      accessorKey: "pastSimple",
      header: () => (
        <div className="md:text-base font-bold capitalize">Präteritum</div>
      ),
      cell: ({ row }) => {
        const verb = row.original.pastSimple;

        return <VerbTableCell verb={verb} />;
      },
    },
    {
      accessorKey: "pastParticle",
      header: () => (
        <div className="md:text-base font-bold capitalize">Partizip II</div>
      ),
      cell: ({ row }) => {
        const verb = row.original.pastParticle;

        return <VerbTableCell verb={verb} />;
      },
    },
    {
      accessorKey: "translation",
      header: () => (
        <div className="md:text-base font-bold capitalize">Übersetzung</div>
      ),
    },
    {
      accessorKey: "group",
      header: "Group",
      filterFn: selectFilterFn,
      meta: {
        filterComponent: MultiSelect,
      },
    },
    {
      id: "actions",
      cell: FavoriteVerbsCell,
    },
  ];
}
