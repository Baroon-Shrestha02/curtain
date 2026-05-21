import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import SmoothScroll from "@/components/Layout/SmoothScroll";
import ScrollToTop from "@/components/Utils/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Cozy Curtains | Premium Custom Curtains in Kathmandu",
  description:
    "Kathmandu-based custom curtain makers. Sheer linens to blackout drapes, tailored to your windows and delivered across Nepal in 3–7 days.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bebas.variable} min-h-screen flex flex-col`}
      >
        {/* <SmoothScroll /> */}
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
