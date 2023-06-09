import clsx from 'clsx';

interface CellProps {
  value: number;
  isError: boolean;
  isCellSelected: boolean;
  isNeighbourOfSelected: boolean;
  isHidden: boolean;
  onSelect: () => void;
}

export const Cell = ({ value, isCellSelected, isError, isNeighbourOfSelected, isHidden, onSelect }: CellProps) => {
  return (
    <td
      onClick={onSelect}
      className={clsx(
        'text-3xl text-blue-900 font-light text-center border-[1px] border-blue-200 md:w-[48px] md:h-[48px] w-[42px] h-[42px] cursor-pointer [&:nth-child(3n)]:border-r-[2px] [&:nth-child(3n)]:border-r-blue-900 select-none',
        isNeighbourOfSelected && 'bg-[#e2ebf3]',
        isError && 'text-red bg-[#f7cfd6]',
        isCellSelected && '!bg-[#bbdefb]',
        isHidden && 'opacity-0'
      )}
    >
      {!!value && value}
    </td>
  );
};
