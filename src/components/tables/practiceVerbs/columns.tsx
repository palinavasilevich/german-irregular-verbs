"use client";

import { ColumnDef } from "@tanstack/react-table";

import { HEADERS } from "@/constants";
import { Verb } from "@/types";
import VerbInput from "@/components/verbInput";

export const columns: ColumnDef<Verb>[] = [
  ...HEADERS.map(({ accessorKey, title }, index) => ({
    accessorKey,
    header: () => <div className="text-base font-bold capitalize">{title}</div>,
    cell: VerbInput,
    meta: {
      cellIndex: index,
    },
  })),
  {
    accessorKey: "translation",
    header: () => (
      <div className="text-base font-bold capitalize">übersetzung</div>
    ),
  },
];
