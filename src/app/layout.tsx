import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Online JavaScript Compiler & Playground | JS CodeLab",
    template: "%s | JS CodeLab"
  },
  description: "Write, run, test, and learn JavaScript online with JS CodeLab — a free browser-based JavaScript compiler and playground with examples and developer-friendly tools.",
  applicationName: "JS CodeLab",
  authors: [{ name: "JS CodeLab" }],
  creator: "JS CodeLab",
  publisher: "JS CodeLab",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Free Online JavaScript Compiler & Playground | JS CodeLab",
    description: "Write, run, test, and learn JavaScript online with JS CodeLab — a free browser-based JavaScript compiler and playground.",
    url: SITE_URL,
    siteName: "JS CodeLab",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'JS CodeLab - Free Online JavaScript Compiler & Playground',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Online JavaScript Compiler & Playground | JS CodeLab",
    description: "Write, run, test, and learn JavaScript online with JS CodeLab.",
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 antialiased font-sans flex flex-col transition-colors"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
