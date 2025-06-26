'use client';

import { useState } from 'react';
import DateFilterForm from './components/DateFilterForm';
import PickListTable from './components/PickListTable';


export default function HomePage() {
  const [pickList, setPickList] = useState<Record<string, number> | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPickList = async (date: string) => {
    const res = await fetch(`/api/pick-list?date=${date}`);
    const data = await res.json();
    setPickList(data);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Warehouse Pick List Generator</h1>
        <div className="bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-700">
          <DateFilterForm onSubmit={fetchPickList} />
        </div>
        <PickListTable data={pickList} showEmpty={hasSearched} />
      </div>
    </main>

  );
}
