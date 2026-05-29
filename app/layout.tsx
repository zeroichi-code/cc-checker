import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Code 残量チェッカー",
  description: "Claude Code のトークン残量と消費状況を可視化",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <head>
        {/* テーマを localStorage から即時反映（FOUC防止） */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('cc-theme') || 'dark';
            document.documentElement.className = t;
          })();
        `}} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
