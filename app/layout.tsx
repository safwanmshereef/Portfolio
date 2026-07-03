import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Safwan Shereef | Backend Developer & Applied AI Engineer",
  description:
    "Colorful anime and Formula 1 inspired portfolio for Safwan Muhammed Shereef, a backend developer and applied AI engineer.",
  openGraph: {
    title: "Safwan Shereef | Backend Developer & Applied AI Engineer",
    description:
      "Backend systems, applied AI, polished product engineering, anime energy, and race-day precision.",
    images: ["/images/safwan-portrait.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
