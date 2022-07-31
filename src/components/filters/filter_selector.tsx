import { motion } from 'framer-motion';
import styles from './filters.module.css';
import { TiDelete } from 'react-icons/ti';

type FilterItem = { name: string; value: string };

type Props = {
  filters: FilterItem[];
  selected: { [key: string]: boolean };
  resetAll: () => void;
  selectFilter: (filterValue: string) => void;
  deleteFilter: (filterValue: string) => void;
  onClose: () => void;
};

const FilterSelector = ({
  filters,
  selected,
  resetAll,
  selectFilter,
  deleteFilter,
  onClose,
}: Props) => {
  return (
    <motion.section
      className={styles.overlay}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.section
        className={styles.modalContainer}
        initial={{ x: '-50%' }}
        animate={{ y: 50, x: '-50%' }}
        exit={{ y: 0, x: '-50%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.resetBtn} onClick={resetAll}>
          Reset All Filters
        </span>
        <div className={styles.scrollWrapper}>
          <div className={styles.filters}>
            {Object.keys(selected).map((item) => (
              <p className={styles.filter} key={item}>
                {filters.find((filter) => filter.value === item)?.name}
                <span
                  className={styles.icon}
                  onClick={() => deleteFilter(item)}
                >
                  <TiDelete />
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {filters.map((filter) => (
              <li
                className={`${styles.item} ${
                  selected[filter.value] && styles.selected
                }`}
                key={filter.value}
                onClick={() => selectFilter(filter.value)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </motion.section>
  );
};

export default FilterSelector;
