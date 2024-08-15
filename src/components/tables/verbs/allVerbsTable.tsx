"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RocketIcon, StarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import ScrollToTop from "@/components/scrollToTop";

import { useDispatch } from "react-redux";
import {
  addVerbsToStudy,
  removeSelectedVerbs,
  selectFavoriteVerbs,
} from "@/lib/redux/features/verb.slice";

import { useSelector } from "react-redux";

import { Verb, DataTableFilterField } from "@/types";
import { DataTableFacetedFilter } from "@/components/dataTable/dataTableFacetedFilter";
import { DataTable } from "@/components/dataTable/dataTable";

interface AllVerbsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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

  const isFiltered = table.getState().columnFilters.length > 0;
  const isSelected = table.getFilteredSelectedRowModel().rows.length > 0;

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
        const countGroups = verbs.filter((v) => v.group === verb.group).length;

        acc.push({
          label: verb.group,
          value: verb.group,
          count: countGroups,
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

  const resetFilter = () => {
    if (isFiltered) {
      table.resetColumnFilters();
    }

    table.toggleAllPageRowsSelected(false);

    if (favoriteVerbs?.length > 0) {
    }
  };

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <div className="flex gap-4">
        <Input
          placeholder="Search verb..."
          value={
            (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("infinitive")?.setFilterValue(event.target.value)
          }
          className="max-w-full lg:max-w-sm"
        />

        <div className="flex gap-4 justify-between w-full">
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
          {(isFiltered || isSelected || favoriteVerbs.length > 0) && (
            <Button
              aria-label="Reset filters"
              variant="outline"
              size="sm"
              className="h-10 px-2 lg:px-3 border self-end"
              onClick={() => resetFilter()}
            >
              <Cross2Icon className="mr-2 size-4" aria-hidden="true" />
              Reset filters
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 my-4">
        {isSelected && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClickAddVerbsToStudy}
            className="h-10 ml-0"
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
      <DataTable table={table} />
    </div>
  );
}
