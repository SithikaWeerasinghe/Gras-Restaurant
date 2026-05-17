import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter", 
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-playfair", 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRAS | Premium BYOB Restaurant",
  description: "An elevated BYOB dining experience in Gampaha. Premium cuisine, warm ambience, and an unforgettable atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
