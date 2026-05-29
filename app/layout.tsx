import type { Metadata } from "next";
import "./globals.css";
import AsciiPaintBackground from "@/components/background/AsciiPaintBackground";

export const metadata: Metadata = {
  title: "Luis Diaz Granados",
  description:
    "Personal portfolio and blog for Luis Diaz Granados, a Computer Engineering student at Purdue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <AsciiPaintBackground />

        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}