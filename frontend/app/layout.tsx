import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synergy — Supply chain trace",
  description:
    "Multi-tier supply chain reconstruction from open trade data — HSN-anchored graph (Tier 0–6).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full overflow-hidden antialiased"
      style={
        {
          "--font-geist-sans":
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          "--font-geist-mono":
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        } as CSSProperties
      }
    >
      <body className="flex h-full min-h-0 flex-col overflow-hidden bg-[#030306] text-zinc-100 antialiased [text-rendering:optimizeLegibility]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
