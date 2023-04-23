import s from '../Header/Header.module.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IuseState, MyContext } from '../../App';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addValue } from '../../Features/SearchSlice';

const Search = () => {
  const value = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue } = useContext(MyContext) as IuseState;
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    window.addEventListener('beforeunload', componentCleanup);
    const storageValue = localStorage.getItem('search');
    setInputValue(storageValue || '');

    return () => {
      window.removeEventListener('beforeunload', componentCleanup);
    };
  }, []);

  const componentCleanup = () => {
    if (inputRef.current?.value !== null)
      localStorage.setItem('search', inputRef.current?.value as string);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    dispatch(addValue(inputValue));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue(event.currentTarget['search'].value);
  };

  return (
    <div className={s.headerSearch}>
      <form id={s['search-form']} role="search" onSubmit={handleSubmit}>
        <input
          id="search"
          placeholder="Search"
          type="search"
          data-testid={'inputSearch'}
          className={s.searchInput}
          name="q"
          value={inputValue}
          ref={inputRef}
          onChange={handleChange}
        />
        <button className={s.searchBtn} type={'submit'}></button>
      </form>
    </div>
  );
};

export default Search;
