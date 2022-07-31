import { useCallback, useState } from 'react';
import styles from './filters.module.css';
import { TiDelete } from 'react-icons/ti';
import { FiPlus } from 'react-icons/fi';
import FilterSelector from './filter_selector';
import { AnimatePresence } from 'framer-motion';

type FilterItem = { name: string; value: string };

type Props = {
  listFilters: FilterItem[];
};

const Filters = ({ listFilters }: Props) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [isOpen, setIsOpen] = useState(false);

  const selectFilter = useCallback(
    (filterValue: string) =>
      setSelected((currVal) => ({ ...currVal, [filterValue]: true })),
    []
  );

  const deleteFilter = useCallback(
    (filterValue: string) =>
      setSelected((currVal) => {
        const newVal = { ...currVal };
        delete newVal[filterValue];
        return newVal;
      }),
    []
  );

  const resetAll = () => setSelected({});

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <p className={styles.addBtn} onClick={() => setIsOpen(true)}>
          Select Filter
          <span className={styles.icon}>
            <FiPlus />
          </span>
        </p>
        {Object.keys(selected).map((item) => (
          <p className={styles.filter} key={item}>
            {listFilters.find((filter) => filter.value === item)?.name}
            <span className={styles.icon} onClick={() => deleteFilter(item)}>
              <TiDelete />
            </span>
          </p>
        ))}
      </div>
      <AnimatePresence>
        {isOpen && (
          <FilterSelector
            filters={listFilters}
            selected={selected}
            resetAll={resetAll}
            selectFilter={selectFilter}
            deleteFilter={deleteFilter}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Filters;
