export const GameSection = () => {
  const rows = Array.from({ length: 9 }, (_, v) => v);

  return (
    <div>
      <table className="border-[2px] border-blue-900">
        <tbody>
          {rows.map((row) => (
            <tr className="[&:nth-child(3n)]:border-b-[2px] [&:nth-child(3n)]:border-blue-900" key={row}>
              {rows.map((column) => {
                return (
                  <td
                    className="text-3xl font-light text-center border-[1px] border-blue-200 w-[48px] h-[48px] cursor-pointer [&:nth-child(3n)]:border-r-[2px] [&:nth-child(3n)]:border-r-blue-900"
                    key={column}>
                    {column}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
