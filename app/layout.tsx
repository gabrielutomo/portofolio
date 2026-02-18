import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Adetya Utomo | Full Stack Developer & ML Engineer",
  description: "Portfolio of Gabriel Adetya Utomo — Full Stack Developer, Machine Learning Engineer, and UI/UX Designer based in Lampung, Indonesia. Available for projects and recruitment.",
  keywords: ["Gabriel Adetya Utomo", "Full Stack Developer", "Machine Learning", "UI/UX Designer", "Web Developer", "Lampung", "Indonesia"],
  openGraph: {
    title: "Gabriel Adetya Utomo | Full Stack Developer",
    description: "Full Stack Developer, Machine Learning Engineer & UI/UX Designer",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
