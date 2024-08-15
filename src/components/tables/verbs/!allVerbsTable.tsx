"use client";

import { useMemo } from "react";

import {
  ColumnFiltersState,
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

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RocketIcon, StarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import ScrollToTop from "@/components/scrollToTop";

import { type DataTableFilterField } from "@/types";

import { useDispatch } from "react-redux";
import {
  addVerbsToStudy,
  removeSelectedVerbs,
  selectFavoriteVerbs,
} from "@/lib/redux/features/verb.slice";

import { useSelector } from "react-redux";

import { Verb } from "@/types";
import { getColumns } from "./allVerbsColumns";
import { DataTable } from "@/components/dataTable/dataTable";

interface AllVerbsTableProps {
  data: Verb[];
}

export function AllVerbsTable({ data }: AllVerbsTableProps) {
  const columns = useMemo(() => getColumns(), []);

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const favoriteVerbs = useSelector(selectFavoriteVerbs);

  // const filterFields: DataTableFilterField<any>[] = [
  //   {
  //     label: "Title",
  //     value: "title",
  //     placeholder: "Filter titles...",
  //   },
  //   {
  //     label: "Status",
  //     value: "status",
  //     options: tasks.status.enumValues.map((status) => ({
  //       label: status[0]?.toUpperCase() + status.slice(1),
  //       value: status,
  //       icon: getStatusIcon(status),
  //       withCount: true,
  //     })),
  //   },
  //   {
  //     label: "Priority",
  //     value: "priority",
  //     options: tasks.priority.enumValues.map((priority) => ({
  //       label: priority[0]?.toUpperCase() + priority.slice(1),
  //       value: priority,
  //       icon: getPriorityIcon(priority),
  //       withCount: true,
  //     })),
  //   },
  // ];

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
      <DataTable table={table} />
    </div>
  );
}
