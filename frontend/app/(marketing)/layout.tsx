import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Synergy — Multi-tier supply chain intelligence",
  description:
    "Reconstruct Tier-N supply networks from open trade data: entity resolution, HSN anchors, recursive graph traversal, and risk-aware visualization.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto overscroll-contain bg-[#030306] font-sans text-zinc-100 antialiased [text-rendering:optimizeLegibility]"
      style={
        {
          "--font-landing-display":
            '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          "--font-landing-mono":
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
