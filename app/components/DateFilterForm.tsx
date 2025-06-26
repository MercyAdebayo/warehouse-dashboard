'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (date: string) => void;
}

export default function DateFilterForm({ onSubmit }: Props) {
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) onSubmit(date);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto">
            <label htmlFor="order-date" className="block text-sm mb-1">Select Order Date</label>
            <input
            id="order-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-auto border border-zinc-600 bg-black text-white p-2 rounded-md"
            required
            />
            
        </div>
        <button
            type="submit"
            className="px-6 py-2 mt-2 sm:mt-7 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
        >
            Generate Pick List
        </button>
    </form>

  );
}
