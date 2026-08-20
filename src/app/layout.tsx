import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LayerMED - Современный подход к поиску врача",
  description: "LayerMED - Современный подход к поиску врача. Наша цель оптимизировать поиск врача до 5 минут активного поиска.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${spaceGrotesk.variable} font-sans h-full antialiased p-5`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

