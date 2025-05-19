"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false} // Disable system theme to ensure consistency
    >
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}