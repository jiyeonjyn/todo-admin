import { useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import styles from './search_bar.module.css';
import { BiSearch } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';

type Props = {
  searchFilters?: {
    name: string;
    value: string;
  }[];
};

type Form = {
  filter: string;
  query: string;
};

const SearchBar = ({ searchFilters }: Props) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlQuery = new URLSearchParams(search);

  const { register, handleSubmit, setValue, watch } = useForm<Form>({
    defaultValues: {
      filter: urlQuery.get('filter') || 'all',
      query: urlQuery.get('query') || '',
    },
  });
  const [isOpened, setIsOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setIsOpened(false));

  useEffect(() => {
    const query = new URLSearchParams(search);
    setValue('filter', query.get('filter') || 'all');
    setValue('query', query.get('query') || '');
  }, [search, setValue]);

  useEffect(() => {
    register('filter');
  }, [register]);

  const onSubmit: SubmitHandler<Form> = (data) =>
    searchFilters
      ? navigate(`${pathname}?filter=${data.filter}&query=${data.query}`)
      : navigate(`${pathname}?query=${data.query}`);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {searchFilters && (
        <>
          <div
            ref={selectRef}
            className={styles.select}
            onClick={() => setIsOpened((curr) => !curr)}
          >
            <span>
              {
                searchFilters.find((item) => item.value === watch('filter'))
                  ?.name
              }
            </span>
            <AiFillCaretDown />
            <ul
              className={`${styles.optionContainer} ${
                isOpened && styles.opened
              }`}
            >
              {searchFilters.map((filter) => (
                <li
                  key={filter.name}
                  className={`${styles.option} ${
                    filter.value === watch('filter') && styles.selected
                  }`}
                  onClick={() => setValue('filter', filter.value)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type="search"
          placeholder="검색어를 입력해 주세요."
          autoComplete="off"
          {...register('query')}
        />
        <span className={styles.button}>
          <BiSearch />
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
