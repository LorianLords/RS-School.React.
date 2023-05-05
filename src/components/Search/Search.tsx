import s from '../Header/Header.module.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { getSearchValue, setSearchValue } from '../../Features/CardsSlice';

const Search = () => {
  const value = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();
  const addValue = (currentValue: string) => dispatch(setSearchValue(currentValue));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value || '');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addValue(inputValue);
  };

  return (
    <div className={s.headerSearch}>
      <form id={s['search-form']} role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          data-testid={'inputSearch'}
          placeholder="Search"
          className={s.searchInput}
          value={inputValue}
          onChange={handleChange}
        />
        <button className={s.searchBtn} type={'submit'}></button>
      </form>
    </div>
  );
};

export default Search;
