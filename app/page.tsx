"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const targetDate = new Date(dateTime);
    const currentDate = new Date();
    const differenceInTime = targetDate.getTime() - currentDate.getTime();

    if (differenceInTime <= 0) {
      router.push(`/result?title=${encodeURIComponent(title)}&daysLeft=0&hoursLeft=0`);
      return;
    }

    const differenceInDays: number = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    const differenceInHours: number = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    router.push(`/result?title=${encodeURIComponent(title)}&daysLeft=${differenceInDays}&hoursLeft=${differenceInHours}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">Contador de Días</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4">
        <input
          type="text"
          placeholder="Título del evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="focus:border-purple-500 hover:border-purple-300 border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="focus:border-purple-500 hover:border-purple-300 border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Calcular
        </button>
      </form>
    </div>
  );
}
