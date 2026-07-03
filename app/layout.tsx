import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://safwan-shereef.vercel.app"),
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
      <body>{children}</body>
    </html>
  );
}
