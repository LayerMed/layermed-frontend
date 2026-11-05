import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { AuthProvider } from "@/features/auth";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://layermed.uz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LayerMed - Запись к врачу онлайн и поиск специалистов",
    template: "%s | LayerMed",
  },
  description: "LayerMed — каталог медицинских направлений, врачей и предложений услуг. Отправьте заявку на приём онлайн.",
  keywords: [
    "запись к врачу",
    "поиск врача",
    "медицинский центр",
    "врачи Ташкент",
    "клиники онлайн",
    "консультация врача",
    "LayerMed",
  ],
  authors: [{ name: "LayerMed Team" }],
  creator: "LayerMed",
  publisher: "LayerMed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LayerMed - Запись к врачу онлайн и поиск специалистов",
    description: "Найдите направление, изучите предложения врачей и отправьте заявку на приём.",
    url: siteUrl,
    siteName: "LayerMed",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LayerMed — поиск врачей и запись на прием онлайн",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LayerMed - Запись к врачу онлайн",
    description: "Поиск медицинских направлений и отправка заявки на приём.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider><AuthProvider>{children}</AuthProvider></ReactQueryProvider>
      </body>
    </html>
  );
}

