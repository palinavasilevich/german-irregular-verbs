"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { DataTablePagination } from "@/components/dataTable/dataTablePagination";

import { Verb, DataTableFilterField } from "@/types";
import { DataTableFacetedFilter } from "@/components/dataTable/dataTableFacetedFilter";

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
    getPaginationRowModel: getPaginationRowModel(),

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

  const getGroups = (verbs: Verb[]) => {
    return verbs.reduce((acc, verb) => {
      if (
        !acc.some((group: DataTableFilterField) => group.label === verb.group)
      ) {
        acc.push({
          label: verb.group,
          value: verb.group,
          withCount: true,
        });
      }
      return acc;
    }, [] as DataTableFilterField[]);
  };

  useEffect(() => {
    dispatch(removeSelectedVerbs());
  }, []);

  const filterableColumns = [
    {
      label: "Groups",
      value: "group",
      options: getGroups(data),
    },
  ];

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="flex items-center justify-between py-4 flex-wrap gap-y-4 md:flex-unwrap">
        <div className="flex gap-2">
          <Input
            placeholder="Search verb..."
            value={
              (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("infinitive")?.setFilterValue(event.target.value)
            }
            className="h-8 max-w-full lg:max-w-sm md:mr-2"
          />
          {filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(column.value ? String(column.value) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.value)}
                    column={table.getColumn(
                      column.value ? String(column.value) : ""
                    )}
                    title={column.label}
                    options={column.options ?? []}
                  />
                )
            )}
        </div>
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
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
