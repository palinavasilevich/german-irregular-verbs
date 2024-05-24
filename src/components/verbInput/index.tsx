"use client";

import { KeyboardEvent, ChangeEvent, useState, forwardRef } from "react";

import { Input } from "../ui/input";
import { NUMBER_OF_ATTEMPTS_TO_ENTER_VERB } from "@/constants";

import { Table, Row } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { toggleCorrectValue } from "@/lib/redux/features/verb.slice";
interface VerbInputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  table: Table<any>;
  row: Row<any>;
  column: any;
  getValue: () => any;
}

const VerbInput = forwardRef<any, VerbInputPropsType>(
  ({ getValue, row, column, table }, ref) => {
    const correctValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const currentInputIndex = row.index * 3 + columnMeta?.cellIndex;

    const [value, setValue] = useState<string>("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [numberOfAttempts, setNumberOfAttempts] = useState(
      NUMBER_OF_ATTEMPTS_TO_ENTER_VERB
    );

    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);

    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        if (value.trim() !== correctValue) {
          if (numberOfAttempts - 1 === 0) {
            tableMeta?.goToNextInput(currentInputIndex);
          }
          setNumberOfAttempts(numberOfAttempts - 1);
        } else {
          setIsCorrectAnswer(true);
          dispatch(toggleCorrectValue({ id: correctValue }));
          tableMeta?.goToNextInput(currentInputIndex);
        }
      }
    };

    const handleBlur = () => {
      if (value.trim() !== correctValue) {
        if (numberOfAttempts - 1 === 0) {
          tableMeta?.goToNextInput(currentInputIndex);
        }
        setNumberOfAttempts(numberOfAttempts - 1);
      } else {
        setIsCorrectAnswer(true);
        dispatch(toggleCorrectValue({ id: correctValue }));
        tableMeta?.goToNextInput(currentInputIndex);
      }
    };

    return (
      <Input
        value={numberOfAttempts === 0 ? correctValue : value}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        onBlur={handleBlur}
        className={`w-[70px] sm:w-full lg:w-[200px] border-dashed border-gray-500 !ring-transparent focus-visible:border-violet-700 text-base ${
          numberOfAttempts < NUMBER_OF_ATTEMPTS_TO_ENTER_VERB
            ? "border-rose-500"
            : ""
        } ${
          isCorrectAnswer &&
          numberOfAttempts === NUMBER_OF_ATTEMPTS_TO_ENTER_VERB
            ? "border-green-500"
            : ""
        }`}
        disabled={isCorrectAnswer || numberOfAttempts === 0}
        ref={ref}
      />
    );
  }
);

VerbInput.displayName = "VerbInput";

export default VerbInput;
