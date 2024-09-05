"use client";

import { Button } from "@/components/ui/button";
import { speakToText } from "@/utils/speakToText";

import { PlayIcon } from "@radix-ui/react-icons";

interface VerbTableCellPropsType {
  verb: string;
}

const VerbTableCell = ({ verb }: VerbTableCellPropsType) => {
  return (
    <div className="flex items-center">
      <span>{verb}</span>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => speakToText(verb)}
      >
        <PlayIcon className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default VerbTableCell;
