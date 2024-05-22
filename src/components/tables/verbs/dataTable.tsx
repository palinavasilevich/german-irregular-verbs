"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  FilterMeta,
  Column,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RocketIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { addVerbsToStudy } from "@/lib/redux/features/verb.slice";
import ScrollToTop from "@/components/scrollToTop";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface CustomFilterMeta extends FilterMeta {
  filterComponent: (info: {
    column: Column<any, unknown>;
    table: TableType<any>;
  }) => JSX.Element;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      rowSelection,
      columnFilters,
      sorting,
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const onClickAddVerbsToStudy = () => {
    const selectedVerbs = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);

    if (selectedVerbs && selectedVerbs.length > 0) {
      dispatch(addVerbsToStudy(selectedVerbs));
      push("/practice");
    }
  };

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search verb..."
          value={
            (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("infinitive")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClickAddVerbsToStudy}>
            <RocketIcon className="mr-2 size-4" aria-hidden="true" />
            {`Study ${table.getFilteredSelectedRowModel().rows.length} ${
              table.getFilteredSelectedRowModel().rows.length === 1
                ? "verb"
                : "verbs"
            }`}
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.column.columnDef?.meta &&
                      (header.column.columnDef?.meta as CustomFilterMeta)
                        .filterComponent
                        ? (
                            header.column.columnDef?.meta as CustomFilterMeta
                          ).filterComponent({
                            column: header.column,
                            table,
                          })
                        : header.isPlaceholder
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
        <ScrollToTop />
      </div>
    </div>
  );
}
