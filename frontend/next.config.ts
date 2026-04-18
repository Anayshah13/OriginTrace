import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Keep Turbopack’s project root on `frontend/` when a parent folder has another lockfile,
// so PostCSS/Tailwind resolve from `frontend/node_modules` (see Next turbopack.root docs).
const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  transpilePackages: ["mapbox-gl"],
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN:
      process.env.MAPBOX_API_KEY ?? process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
  },
};

export default nextConfig;
