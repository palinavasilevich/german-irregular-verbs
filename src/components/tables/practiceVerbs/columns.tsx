"use client";

import { ColumnDef } from "@tanstack/react-table";

import WordInput from "@/components/wordInput";
import { HEADERS } from "@/constants";

export type Verb = {
  infinitive: string;
  pastSimple: string;
  pastParticle: string;
  translation: string;
  group: number;
};

export const columns: ColumnDef<Verb>[] = [
  ...HEADERS.map(({ accessorKey, title }, index) => ({
    accessorKey,
    header: () => <div className="text-base font-bold capitalize">{title}</div>,
    cell: WordInput,
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
