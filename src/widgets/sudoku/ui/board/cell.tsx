import clsx from 'clsx';

interface CellProps {
  value: number;
  isError: boolean;
  isCellSelected: boolean;
  isNeighbourOfSelected: boolean;
  isSimilar: boolean;
  isHidden: boolean;
  isNewValue: boolean;
  onSelect: () => void;
}

export const Cell = ({
  value,
  isSimilar,
  isCellSelected,
  isError,
  isNeighbourOfSelected,
  isNewValue,
  isHidden,
  onSelect,
}: CellProps) => {
  return (
    <td
      onClick={onSelect}
      className={clsx(
        'relative md:text-3xl text-2xl font-light text-center border-[1px] border-blue-200 md:w-[48px] md:h-[48px] w-[auto] h-[auto] [&:nth-child(3n)]:border-r-[2px] [&:nth-child(3n)]:border-r-blue-900 select-none',
        isNeighbourOfSelected && 'bg-[#e2ebf3]',
        isCellSelected && '!bg-[#bbdefb]',
        isSimilar && value && 'bg-[#c3d7ea]',
        isNewValue ? 'text-blue-100' : 'text-blue-900',
        isError && 'text-red bg-[#f7cfd6]',
        isHidden && 'opacity-0'
      )}>
      <i className="opacity-0">0</i>
      <span
        className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: value }}>
        {value}
      </span>
    </td>
  );
};
