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

      <body style={{ backgroundImage: "url('/bg_image.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} className={"antialiased min-h-screen"}>
        {children}
      </body>
    </html>
  );
}
