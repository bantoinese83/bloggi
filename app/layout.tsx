import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Ensure this is present
import ErrorBoundary from "./ErrorBoundary";

import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  title: {
    default: "Lomi Blog",
    template: "%s | Lomi Blog",  // Allows dynamic titles for individual pages
  },
  description: "Welcome to Lomi Blog, your go-to source for the latest updates and articles.",
  keywords: "lomi, blog, articles, updates",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // Adjust as needed
      "max-image-preview": "large", // Correct value
      "max-snippet": -1, // Adjust as needed
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.lomiblog.com",
    title: "Lomi Blog",
    description: "Welcome to Lomi Blog, your go-to source for the latest updates and articles.",
    images: [
      {
        url: "https://www.lomiblog.com/og-image.jpg",
        width: 1200, // Increased width for better quality
        height: 630, // Standard Open Graph image ratio
        alt: "Lomi Blog Og Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lomi Blog",
    description: "Welcome to Lomi Blog, your go-to source for the latest updates and articles.",
    images: ["https://www.lomiblog.com/og-image.jpg"], // Use same image for Twitter
    creator: "@yourTwitterHandle", // Add your Twitter handle
  },
  icons: {
    icon: '/favicon.ico', // Path to your favicon
    apple: '/apple-touch-icon.png', // Path to your apple touch icon
  },
};

export const viewport = {  // ADD THIS
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface Props {
  children: React.ReactNode;
  posts: Post[];
  tags: Tag[];
}

export default function RootLayout({
                                     children,
                                     posts,
                                     tags,
                                   }: Props) {
  return (
    <html lang="en" className="scroll-smooth">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ErrorBoundary posts={posts} tags={tags}>
      {children}
    </ErrorBoundary>
    </body>
    </html>
  );
}
