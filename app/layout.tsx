import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Safwan Shereef | Applied AI Engineer",
  description: "Backend Developer & Applied AI Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased text-cream relative overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
