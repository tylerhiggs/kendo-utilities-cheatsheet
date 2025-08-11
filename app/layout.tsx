import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kendo Utilities Cheatsheet",
  description: "A comprehensive cheatsheet for Kendo CSS utilities",
  icons: [
    {
      rel: "icon",
      url: "/gradient-2.svg",
    },
  ],
  openGraph: {
    title: "Kendo Utilities Cheatsheet",
    description: "A comprehensive cheatsheet for Kendo CSS utilities",
    url: "https://kendo-utilities-cheatsheet.vercel.app",
    siteName: "Kendo Utilities Cheatsheet",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kendo Utilities Cheatsheet",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kendo Utilities Cheatsheet",
    description: "A comprehensive cheatsheet for Kendo CSS utilities",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://kendo-utilities-cheatsheet.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
      <Analytics />
    </html>
  );
}
