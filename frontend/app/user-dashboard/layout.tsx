import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account — Synergy',
  description: 'Profile and company search history',
};

/**
 * Root `body` uses `overflow-hidden` for the full-screen graph; this route needs its own
 * scroll region so long content (Companies list) isn’t clipped at 100vh.
 */
export default function UserDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="user-dashboard-shell fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#05070a] [scrollbar-gutter:stable]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,232,255,0.08),transparent_50%)]" />
      <div className="relative min-h-full">{children}</div>
    </div>
  );
}
