import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";

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

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-real",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${oswald.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <StyleSwitcher />
      </body>
    </html>
  );
}

