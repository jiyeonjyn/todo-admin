import { useReducer, useState } from 'react';
import styles from './filters.module.css';
import { TiDelete } from 'react-icons/ti';
import { FiPlus } from 'react-icons/fi';
import FilterSelector from './filter_selector';
import { AnimatePresence } from 'framer-motion';

type FilterItem = { name: string; value: string };

type Props = {
  listFilters: FilterItem[];
};

type SelectedFilters = { [key: string]: boolean };
type FilterAction = { type: string; target: string };

const filterReducer = (
  prevState: SelectedFilters,
  action: FilterAction
): SelectedFilters => {
  switch (action.type) {
    case 'SELECT':
      return { ...prevState, [action.target]: true };
    case 'DESELECT':
      const newState = { ...prevState };
      delete newState[action.target];
      return newState;
    case 'RESET':
      return {};
    default:
      return prevState;
  }
};

const Filters = ({ listFilters }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, filterDispatch] = useReducer(filterReducer, {});

  const selectFilter = (filter: string) =>
    filterDispatch({ type: 'SELECT', target: filter });

  const deselectFilter = (filter: string) =>
    filterDispatch({ type: 'DESELECT', target: filter });

  const resetAll = () => filterDispatch({ type: 'RESET', target: '' });

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
            <span className={styles.icon} onClick={() => deselectFilter(item)}>
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
            deselectFilter={deselectFilter}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Filters;
