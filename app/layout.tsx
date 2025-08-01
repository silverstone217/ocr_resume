import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "OCR resume - avec IA",
  description:
    "Resuver vos fichiers, textes et corriger les fautes gramaticales",
  keywords: "ocr, resume, ia, text, fichier,  fautes,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${lato.className} scroll-smooth antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
