import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B.K. Lohia & Associates - Chartered Accountants in Kotkapura",
  description: "B.K. Lohia & Associates is a premium Chartered Accountancy firm in Kotkapura, Punjab, specializing in Income Tax, GST, and corporate financial services.",
  icons: {
    icon: "/logo.webp",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
