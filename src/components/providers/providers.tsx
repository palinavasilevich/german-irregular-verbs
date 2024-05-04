"use client";

import { FC } from "react";

import { ThemeProvider } from "./themeProvider";
import { VerbProvider } from "@/context/VerbContext";

interface ProvidersPropsType {
  children: React.ReactNode;
}

const Providers: FC<ProvidersPropsType> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <VerbProvider>{children}</VerbProvider>
    </ThemeProvider>
  );
};

export default Providers;
