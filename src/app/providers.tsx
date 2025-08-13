"use client";

import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { LanguageProvider } from "@/contexts/language-context";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <LanguageProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </LanguageProvider>
  );
}
