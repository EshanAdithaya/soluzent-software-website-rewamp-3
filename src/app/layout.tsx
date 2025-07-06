import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building Digital Excellence | Innovative Software Solutions",
  description: "We craft innovative software solutions that transform businesses and create meaningful digital experiences. Expert web development, mobile apps, and enterprise solutions.",
  keywords: "software development, web development, mobile apps, enterprise solutions, digital transformation, UI/UX design, cloud solutions",
  authors: [{ name: "Building Digital Excellence" }],
  creator: "Building Digital Excellence",
  openGraph: {
    title: "Building Digital Excellence | Innovative Software Solutions",
    description: "We craft innovative software solutions that transform businesses and create meaningful digital experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Building Digital Excellence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Digital Excellence | Innovative Software Solutions",
    description: "We craft innovative software solutions that transform businesses and create meaningful digital experiences.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
