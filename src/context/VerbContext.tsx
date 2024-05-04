"use client";

import { Verb } from "@/types";
import { storage } from "@/utils/storage";
import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

export const VerbContext = createContext<{
  selectedVerbs: Verb[];
  setSelectedVerbs: Dispatch<SetStateAction<Verb[]>>;
}>({
  selectedVerbs: [],
  setSelectedVerbs: () => {},
});

export const VerbProvider = ({ children }: PropsWithChildren<{}>) => {
  const verbsFromStorage = storage.getItem("selectedVerbs");

  const [selectedVerbs, setSelectedVerbs] = useState<Verb[]>(
    verbsFromStorage || []
  );

  return (
    <VerbContext.Provider
      value={{
        selectedVerbs,
        setSelectedVerbs,
      }}
    >
      {children}
    </VerbContext.Provider>
  );
};
