"use client";

import { FC } from "react";

import { ThemeProvider } from "./themeProvider";
import StoreProvider from "@/lib/redux/StoreProvider";

interface ProvidersPropsType {
  children: React.ReactNode;
}

const Providers: FC<ProvidersPropsType> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
};

export default Providers;
