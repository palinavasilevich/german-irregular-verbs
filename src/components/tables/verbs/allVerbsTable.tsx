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

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RocketIcon, StarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import ScrollToTop from "@/components/scrollToTop";

import { useDispatch } from "react-redux";
import {
  addVerbsToStudy,
  removeSelectedVerbs,
  selectFavoriteVerbs,
} from "@/lib/redux/features/verb.slice";

import { useSelector } from "react-redux";

interface AllVerbsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface CustomFilterMeta extends FilterMeta {
  filterComponent: (info: {
    column: Column<any, unknown>;
    table: TableType<any>;
  }) => JSX.Element;
}

export function AllVerbsTable<TData, TValue>({
  columns,
  data,
}: AllVerbsTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const favoriteVerbs = useSelector(selectFavoriteVerbs);

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

  const dispatch = useDispatch();
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

  const studyFavoriteVerbs = () => {
    dispatch(removeSelectedVerbs());
    dispatch(addVerbsToStudy(favoriteVerbs));
    push("/practice");
  };

  useEffect(() => {
    dispatch(removeSelectedVerbs());
  }, []);

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="flex items-center justify-between py-4 flex-wrap gap-y-4 md:flex-unwrap">
        <Input
          placeholder="Search verb..."
          value={
            (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("infinitive")?.setFilterValue(event.target.value)
          }
          className="max-w-full lg:max-w-sm md:mr-2"
        />
        <div className="flex flex-wrap gap-y-4">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClickAddVerbsToStudy}
              className="h-10 ml-0 mr-4"
            >
              <RocketIcon className="mr-2 size-4" aria-hidden="true" />
              {`Study ${table.getFilteredSelectedRowModel().rows.length} ${
                table.getFilteredSelectedRowModel().rows.length === 1
                  ? "verb"
                  : "verbs"
              }`}
            </Button>
          )}
          {favoriteVerbs?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={studyFavoriteVerbs}
              className="h-10"
            >
              <StarIcon className="mr-2 size-4" aria-hidden="true" />
              {`Study ${favoriteVerbs.length} ${
                favoriteVerbs.length === 1 ? "favorite verb" : "favorite verbs"
              }`}
            </Button>
          )}
        </div>
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
