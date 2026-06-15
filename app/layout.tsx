import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ResponsiveProvider } from "./contexts";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielutomo.vercel.app"),
  title: "Gabriel Adetya Utomo | Full Stack Developer & ML Engineer",
  description: "Portfolio of Gabriel Adetya Utomo — Full Stack Developer, Machine Learning Engineer, and UI/UX Designer based in Lampung, Indonesia. Available for projects and recruitment.",
  keywords: ["Gabriel Adetya Utomo", "Full Stack Developer", "Machine Learning", "UI/UX Designer", "Web Developer", "Lampung", "Indonesia"],
  authors: [{ name: "Gabriel Adetya Utomo" }],
  openGraph: {
    title: "Gabriel Adetya Utomo | Full Stack Developer",
    description: "Full Stack Developer, Machine Learning Engineer & UI/UX Designer",
    type: "website",
    url: "https://gabrielutomo.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Adetya Utomo | Full Stack Developer",
    description: "Full Stack Developer, Machine Learning Engineer & UI/UX Designer",
  },
};

// Task 8.4 - Viewport config for mobile performance (Req 4.1, 4.4)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ResponsiveProvider>
          {children}
        </ResponsiveProvider>
      </body>
    </html>
  );
}
