import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import AnimatedBackground from '../app/background/AnimatedBackground.tsx'

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
      <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
