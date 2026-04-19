'use client';

import Image from 'next/image';

type Props = {
  /** Layout only — no filters or color manipulation (asset includes white wordmark). */
  className?: string;
  priority?: boolean;
  alt?: string;
};

/**
 * Always uses `public/ot1.png` as the sole ORIGINTRACE mark. Do not apply opacity,
 * invert, blend modes, or color filters — the artwork carries its own white typography.
 */
export function OriginTraceLogo({
  className = 'h-7 w-auto max-h-10 sm:h-8 sm:max-h-11',
  priority,
  alt = 'ORIGINTRACE',
}: Props) {
  return (
    <Image
      src="/ot1.png"
      alt={alt}
      width={720}
      height={405}
      className={`object-contain ${className}`}
      draggable={false}
      priority={priority}
      sizes="(max-width: 640px) 220px, min(42rem, 50vw)"
      unoptimized
    />
  );
}
