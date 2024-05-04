"use client";

import { KeyboardEvent, ChangeEvent, useState, forwardRef } from "react";

import { Input } from "../ui/input";
import { NUMBER_OF_ATTEMPTS_TO_ENTER_VERB } from "@/constants";

interface WordInputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleKeyPress?: () => void;
  cellRef?: any;
  getValue: () => any;
}

const WordInput = forwardRef<HTMLInputElement, WordInputPropsType>(
  ({ handleKeyPress, cellRef, getValue, ...props }) => {
    const [value, setValue] = useState<string>("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [numberOfAttempts, setNumberOfAttempts] = useState(
      NUMBER_OF_ATTEMPTS_TO_ENTER_VERB
    );

    const correctValue = getValue();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value);

    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (value.trim() !== correctValue) {
          if (numberOfAttempts - 1 === 0 && handleKeyPress) {
            handleKeyPress();
          }
          setNumberOfAttempts(numberOfAttempts - 1);
        } else {
          setIsCorrectAnswer(true);
          if (handleKeyPress) handleKeyPress();
        }
      }
    };

    return (
      <Input
        value={numberOfAttempts === 0 ? correctValue : value}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        className={`w-[200px] border-dashed border-gray-500 !ring-transparent focus-visible:border-violet-700 text-base ${
          numberOfAttempts === 0 ? "border-rose-500" : ""
        } ${
          isCorrectAnswer &&
          numberOfAttempts === NUMBER_OF_ATTEMPTS_TO_ENTER_VERB
            ? "border-green-500"
            : ""
        }`}
        disabled={isCorrectAnswer || numberOfAttempts === 0}
        ref={cellRef}
        {...props}
      />
    );
  }
);

export default WordInput;
