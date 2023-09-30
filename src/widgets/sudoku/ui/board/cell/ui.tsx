import clsx from 'clsx';
import styles from './styles.module.scss';

interface CellProps {
  value: number;
  isError: boolean;
  isCellSelected: boolean;
  isNeighbourOfSelected: boolean;
  isSimilar: boolean;
  isHidden: boolean;
  isNewValue: boolean;
  notesOfCell: Set<number>;
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
  notesOfCell,
  onSelect,
}: CellProps) => {
  const notes = Array.from({ length: 9 }, (_, idx) => {
    const index = idx + 1;

    return [...notesOfCell].includes(index) ? index : null;
  });

  return (
    <td
      onClick={onSelect}
      className={clsx(
        'relative md:text-[30px] text-[25px] leading-none text-center border-[1px] border-blue-200 dark:border-black md:w-[48px] md:h-[48px] w-[auto] h-[auto] [&:nth-child(3n)]:border-r-sudoku-border [&:nth-child(3n)]:border-r-blue-900 dark:[&:nth-child(3n)]:border-r-black select-none',
        styles.cell,
        {
          [styles.isNeighbourOfSelected]: isNeighbourOfSelected,
          [styles.isCellSelected]: isCellSelected,
          [styles.isSimilar]: isSimilar,
          [styles.isNewValue]: isNewValue,
          [styles.isError]: isError,
          [styles.isHidden]: isHidden,
        }
      )}
    >
      <i className="opacity-0">0</i>
      <span
        className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: value }}
      >
        {value}
      </span>
      {!value && (
        <div className="absolute grid p-1 px-1.5 pt-2.5 grid-cols-3 top-0 left-0 w-full h-full">
          {notes.map((note, idx) => (
            <span key={idx} className="relative flex items-center opacity-60 dark:opacity-100 pointer-events-none">
              <span className="absolute top-0 left-0 w-full h-full text-[9px] leading-none font-normal">{note}</span>
            </span>
          ))}
        </div>
      )}
    </td>
  );
};
