import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SphereGlowOverlay from "@/components/SphereGlowOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Fixed ambient sphere glow – purely decorative, pointer-events-none */}
        <SphereGlowOverlay />
        <Navbar />
        {/* sphere-main adds CSS perspective so rotateX in child sections looks 3-D */}
        <main className="flex-grow sphere-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
