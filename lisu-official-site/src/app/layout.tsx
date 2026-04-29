import type { Metadata, Viewport } from "next";
import { SkipLink } from "@/components/site/skip-link";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

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
    <html lang="zh-CN">
      <body className="min-h-dvh bg-white text-slate-950 antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
