"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Evento';
  const daysLeft = searchParams.get('daysLeft') || '0';
  const hoursLeft = searchParams.get('hoursLeft') || '0';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">{title}</h1>
      <p className="text-xl sm:text-2xl text-center">
        {daysLeft === '0' && hoursLeft === '0'
          ? 'El evento es hoy o ha pasado.'
          : `Quedan ${daysLeft} día(s) y ${hoursLeft} hora(s) para el evento.`}
      </p>
    </div>
  );
}

export const SuspendedResultPage = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <ResultPage />
  </Suspense>
);
