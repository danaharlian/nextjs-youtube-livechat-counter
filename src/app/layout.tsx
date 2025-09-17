import type { Metadata } from "next";
import "@/styles/globals.css";

import { geistMono, geistSans } from "@/lib/fonts";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Youtube Live Chat Counter",
  description: "Youtube Live Chat Counter for MLBB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
