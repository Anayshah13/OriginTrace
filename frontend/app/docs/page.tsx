import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#05070A] px-6 py-16 text-[#e4e4e7]">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#00F2FF]/85">
          Synergy / Documentation
        </p>
        <h1
          className="mt-4 text-3xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-global-serif), ui-serif" }}
        >
          Documentation
        </h1>
        <p className="mt-6 leading-relaxed text-[#a0a0a0]">
          This is a placeholder page. Wire your OpenAPI spec, onboarding guides, and
          HSN normalization notes here.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm text-[#00F2FF] underline-offset-4 hover:underline"
        >
          ← Back to GLOBALTRACE
        </Link>
      </div>
    </div>
  );
}
