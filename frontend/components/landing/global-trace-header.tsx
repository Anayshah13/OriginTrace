"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export function GlobalTraceHeader() {
  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0b0e16]/78 backdrop-blur-xl"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-[3.75rem] sm:px-6">
        <Link
          href="/"
          className="relative flex shrink-0 items-center outline-none"
          aria-label="ORIGINTRACE home"
        >
          <Image
            src="/ot2.png"
            alt="ORIGINTRACE"
            width={168}
            height={44}
            className="h-7 w-auto sm:h-8"
            priority
            sizes="(max-width: 640px) 140px, 168px"
          />
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/docs"
            className="hidden font-sans text-[0.8125rem] font-medium tracking-wide text-[#a0a0a0] transition hover:text-white sm:inline"
          >
            Documentation
          </Link>
          <Link
            href="/api-docs"
            className="hidden font-sans text-[0.8125rem] font-medium tracking-wide text-[#a0a0a0] transition hover:text-white sm:inline"
          >
            API
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
