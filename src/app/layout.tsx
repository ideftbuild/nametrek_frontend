import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import PageBackground from '@/app/background/PageBackground'
import Notification from '../components/Notification';
import InitDynamicBg from '../components/InitDynamicBg';

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
        <InitDynamicBg />
        <Notification />
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
