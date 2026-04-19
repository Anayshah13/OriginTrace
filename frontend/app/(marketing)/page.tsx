import Link from "next/link";

import { GlobalTraceCoolTrails } from "@/components/landing/global-trace-cool-trails";
import { GlobalTraceHeader } from "@/components/landing/global-trace-header";
import { GlobalTraceHero } from "@/components/landing/global-trace-hero";

export default function LandingPage() {
  return (
    <div className="relative min-h-full bg-[#0b0e16]">
      <GlobalTraceCoolTrails />
      {/* Soft white rise from bottom — sits under header + hero, above the map */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/[0.14] via-white/[0.05] to-transparent"
        aria-hidden
      />
      <GlobalTraceHeader />
      <main className="relative z-10">
        <GlobalTraceHero />
      </main>
      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center">
        <p className="text-[0.65rem] tracking-[0.25em] text-[#6b7280]">
          <Link
            href="/dashboard"
            className="text-[#00F2FF]/75 transition hover:text-[#00F2FF]"
          >
            Launch console
          </Link>
          <span className="mx-3 text-[#3f3f46]">·</span>
          <Link href="/docs" className="hover:text-[#a0a0a0]">
            Docs
          </Link>
          <span className="mx-3 text-[#3f3f46]">·</span>
          <Link href="/api-docs" className="hover:text-[#a0a0a0]">
            API
          </Link>
        </p>
      </footer>
    </div>
  );
}
