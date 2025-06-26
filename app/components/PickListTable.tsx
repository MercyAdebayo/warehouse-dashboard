interface Props {
  data: Record<string, number> | null;
  showEmpty: boolean;
}

export default function PickListTable({ data, showEmpty }: Props) {
  if (showEmpty && (!data || Object.keys(data).length === 0)) {
    return <p className="text-gray-500 mt-4">No pick list found for this date.</p>;
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Pick List</h2>
      <table className="w-full text-sm mt-4 table-fixed border-collapse bg-transparent">
        <thead className="bg-zinc-200 dark:bg-zinc-800 text-black dark:text-black text-left">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Item</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([item, quantity]) => (
            <tr key={item}>
              <td className="border px-4 py-2">{item}</td>
              <td className="border px-4 py-2">{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
