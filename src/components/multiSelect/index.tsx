"use client";

import { useMemo, useState } from "react";
import { Column, Table } from "@tanstack/react-table";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";

const MultiSelect = ({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) => {
  const columnFilterValue = column.getFilterValue();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const options = useMemo(() => {
    const options = new Set();
    table.getPreFilteredRowModel().flatRows.forEach((row) => {
      const label = row.getValue(column.id);
      options.add(label);
    });
    return [...options.values()];
  }, [column.id, table.getPreFilteredRowModel(), table]);

  const handleCheckedChange = (option: string) => {
    if (option.toLowerCase() === "all") {
      setSelectedOptions([]);
      column.setFilterValue([]);
      return;
    }

    let newSelectedOptions;

    if (!selectedOptions.includes(option) && option.toLowerCase() !== "all") {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    }

    setSelectedOptions(newSelectedOptions);

    column.setFilterValue(newSelectedOptions);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm md:text-base font-bold capitalize p-0 m-0 hover:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          Groups <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <ScrollArea className="h-72 rounded-md">
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            onCheckedChange={() => handleCheckedChange("all")}
          >
            All
          </DropdownMenuCheckboxItem>

          {options.map((option: any) => (
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              key={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => handleCheckedChange(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
