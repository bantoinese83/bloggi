import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./ErrorBoundary";

import { User } from "../types/user";
import { Post } from "../types/post";
import { Tag } from "../types/tag";
import { Comment } from "../types/comment";
import { Notification } from "../types/notification";
import { Subscription } from "../types/subscription";
import { Tipp } from "../types/tipp";
import { Community } from "../types/community";
import { Files } from "../types/files";
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
  viewport: "width=device-width, initial-scale=1.0",
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
