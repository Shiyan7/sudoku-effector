import clsx from 'clsx';

interface CellProps {
  value: number;
  isSelected: boolean;
  isHidden: boolean;
  onSelect: () => void;
}

export const Cell = ({ value, isSelected, isHidden, onSelect }: CellProps) => {
  return (
    <td
      onClick={onSelect}
      className={clsx(
        'text-3xl text-blue-900 font-light text-center border-[1px] border-blue-200 md:w-[48px] md:h-[48px] w-[42px] h-[42px] cursor-pointer [&:nth-child(3n)]:border-r-[2px] [&:nth-child(3n)]:border-r-blue-900 select-none',
        isSelected && 'bg-[#bbdefb]',
        isHidden && 'opacity-0'
      )}>
      {!!value && value}
    </td>
  );
};
