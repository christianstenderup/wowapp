import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokProvider from "./components/StoryblokProvider";

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin]
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krølles wow app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
