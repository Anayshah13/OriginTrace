import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

const landingDisplay = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-landing-display",
});

const landingMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-landing-mono",
});

export const metadata: Metadata = {
  title: "GLOBALTRACE — Synergy",
  description:
    "Identify origin nodes, trace supply routes, and map raw material dependencies across the global grid.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${landingDisplay.variable} ${landingMono.variable} fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto overscroll-contain bg-[#05070A] font-sans text-zinc-100 antialiased [text-rendering:optimizeLegibility]`}
    >
      {children}
    </div>
  );
}
