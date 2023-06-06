export const Controls = () => {
  const numbers = Array.from({ length: 9 }, (_, v) => v + 1);

  return (
    <div className="">
      <div className="grid gap-2 grid-cols-3 mb-4">
        {numbers.map((number) => (
          <button key={number} className="rounded bg-blue-400 text-blue-100 text-4xl font-light py-5">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
