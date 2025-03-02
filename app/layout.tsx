// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./ErrorBoundary";

import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lomi Blog",
  description: "Welcome to Lomi Blog, your go-to source for the latest updates and articles.",
  keywords: "lomi, blog, articles, updates",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.lomiblog.com",
    title: "Lomi Blog",
    description: "Welcome to Lomi Blog, your go-to source for the latest updates and articles.",
    images: [
      {
        url: "https://www.lomiblog.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Lomi Blog Og Image",
      },
    ],
  },
};

export const viewport = {  // ADD THIS
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
    </body>
    </html>
  );
}