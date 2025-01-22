import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Nametrek",
  description: "Name Name Name Name",
  icons: null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-emerald-900"}>
        {children}
      </body>
    </html>
  );
}
