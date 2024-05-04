"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useRef, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setIsOpenDialog: (isOpenDialog: boolean) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setIsOpenDialog,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyPress = (currentInputIdx: number) => () => {
    const inputs = inputRefs.current;

    let nextInput: HTMLInputElement | undefined = inputs[currentInputIdx + 1];

    if (!nextInput) {
      const next = inputs
        .slice(currentInputIdx + 1)
        .find((input) => input !== undefined);

      nextInput = next ? next : inputs.find((input) => input !== undefined);
    }

    nextInput?.focus();
    delete inputs[currentInputIdx];

    if (inputs.every((input) => input === undefined)) {
      setIsOpenDialog(true);
    }
  };

  useEffect(() => {
    const input: HTMLInputElement = inputRefs.current[0];

    if (input) input?.focus();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIdx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        cellRef: (node: HTMLInputElement) => {
                          if (node) {
                            inputRefs.current[rowIdx * 3 + cellIdx] = node;
                          }
                        },
                        handleKeyPress: handleKeyPress(rowIdx * 3 + cellIdx),
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
