"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScanLine, Search } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function GlobalTraceHero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      boxShadow:
        "0 0 52px -6px rgba(0,242,255,0.55), inset 0 0 24px rgba(0,242,255,0.06)",
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const term = q.trim();
      const href =
        term.length > 0
          ? `/dashboard?q=${encodeURIComponent(term)}`
          : "/dashboard";
      router.push(href);
    },
    [q, router]
  );

  return (
    <section className="relative z-10 flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 pb-24 pt-10 sm:px-6">
      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          ref={badgeRef}
          variants={item}
          className="mb-8 grid size-16 place-items-center rounded-2xl border border-[#00F2FF]/25 bg-[linear-gradient(145deg,rgba(10,16,28,0.95),rgba(5,8,14,0.98))] shadow-[0_0_48px_-12px_rgba(0,242,255,0.35)] sm:size-[4.25rem]"
          style={{
            clipPath:
              "polygon(30% 0%,70% 0%,100% 50%,70% 100%,30% 100%,0% 50%)",
          }}
        >
          <ScanLine className="size-8 text-[#00F2FF] sm:size-9" strokeWidth={1.35} />
        </motion.div>

        <motion.p
          variants={item}
          className="font-mono text-[0.65rem] uppercase tracking-[0.42em] text-[#00F2FF]/90"
          style={{ fontFamily: "var(--font-landing-mono), ui-monospace" }}
        >
          by SYNERGY
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[1.02] tracking-[0.02em] text-white"
          style={{ fontFamily: "var(--font-global-serif), ui-serif" }}
        >
          GLOBALTRACE
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.28em] text-[#a0a0a0] sm:text-[0.7rem]"
          style={{ fontFamily: "var(--font-landing-display), ui-sans-serif" }}
        >
          Identify origin nodes, trace supply routes, and map raw material
          dependencies across the global grid.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex w-full max-w-xl flex-col gap-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full rounded-full border border-[#00F2FF]/35 bg-[rgba(8,12,22,0.85)] px-6 py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.22em] text-[#00F2FF] shadow-[0_0_48px_-16px_rgba(0,242,255,0.35)] transition hover:border-[#00F2FF]/55 hover:bg-[#00F2FF]/10"
            style={{ fontFamily: "var(--font-landing-mono), ui-monospace" }}
          >
            Continue with demo data
          </button>

          <p
            className="text-center text-[0.65rem] uppercase tracking-[0.28em] text-[#6b7280]"
            style={{ fontFamily: "var(--font-landing-mono), ui-monospace" }}
          >
            Or trace a live company
          </p>
        </motion.div>

        <motion.form
          variants={item}
          onSubmit={onSubmit}
          className="mt-2 w-full max-w-xl"
        >
          <div className="flex items-stretch rounded-full border border-[#00F2FF]/15 bg-[rgba(8,12,22,0.72)] py-1 pl-1 pr-1 shadow-[0_0_60px_-20px_rgba(0,242,255,0.25)] backdrop-blur-md">
            <span
              className="hidden shrink-0 items-center gap-3 border-r border-white/10 px-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#00F2FF] sm:flex"
              style={{ fontFamily: "var(--font-landing-mono), ui-monospace" }}
            >
              Target ID
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter company name"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white/95 outline-none placeholder:text-[#6b7280] sm:px-5"
              style={{ fontFamily: "var(--font-landing-display), ui-sans-serif" }}
            />
            <button
              type="submit"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[#00F2FF]/15 text-[#00F2FF] transition hover:bg-[#00F2FF]/25"
              aria-label="Search"
            >
              <Search className="size-5" strokeWidth={2} />
            </button>
          </div>
          <p className="mt-4 text-center text-[0.65rem] tracking-wide text-[#6b7280]">
            Enter a company to load its chain from the API, or use{" "}
            <Link href="/dashboard" className="text-[#00F2FF]/80 underline-offset-4 hover:underline">
              demo data
            </Link>
            .
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
}
