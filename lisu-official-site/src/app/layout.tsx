import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { SkipLink } from "@/components/site/skip-link";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

const notoSansSc = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={notoSansSc.variable}>
      <body className="min-h-dvh bg-white text-slate-950 antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
