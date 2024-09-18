import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutProvider } from "@/components/layout-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uptime Monitor",
  description: "Generated by create next app",
};

// 根布局
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
