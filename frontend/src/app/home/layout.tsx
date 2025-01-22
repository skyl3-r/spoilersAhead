import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/components/Navbar'
import { lato } from "@/utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${lato.className} antialiased`}>
        {/* <header>
          <MyLogo />
          <nav><a href="/">Home</a></nav>
        </header> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
