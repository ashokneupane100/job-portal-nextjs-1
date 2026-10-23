import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

// Font for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Font for body/paragraphs
const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Job Sewa (जब सेवा) | Nepal's Tech & Corporate Job Portal",
  description:
    "Job Sewa (जब सेवा) — Discover verified tech, software, fintech, and corporate jobs across Kathmandu, Lalitpur, Pokhara, and remote teams in Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${urbanist.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
