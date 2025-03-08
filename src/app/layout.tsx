import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import PageBackground from '../app/background/PageBackground.tsx'

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
      <body className={"relative antialiased min-h-screen"}>
      <PageBackground />
        {children}
      </body>
    </html>
  );
}
