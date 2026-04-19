'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { KnowledgeBrain } from '../components/knowledge-brain/KnowledgeBrain';

function DashboardContent() {
  const params = useSearchParams();
  const q = params.get('q');
  return <KnowledgeBrain initialQuery={q} />;
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={<div className="h-screen w-full bg-[#06080c]" aria-hidden />}
    >
      <DashboardContent />
    </Suspense>
  );
}
