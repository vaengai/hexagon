import type React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function HexagonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add top padding to account for fixed navbar */}
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
