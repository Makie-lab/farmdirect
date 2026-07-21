import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmDirect - Farm to Table, No Middleman",
  description: "Connect directly with local farmers. Buy fresh produce at fair prices. Empowering farmers, feeding communities.",
};

const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_your_key_here"
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return hasClerkKeys ? (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
      </html>
    </ClerkProvider>
  ) : (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
