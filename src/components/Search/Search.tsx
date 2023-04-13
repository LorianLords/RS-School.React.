import s from '../Header/Header.module.css';
import React, { useEffect, useRef, useState } from 'react';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.addEventListener('beforeunload', componentCleanup);
    const storageValue = localStorage.getItem('search');
    setValue(storageValue || '');

    return () => {
      window.removeEventListener('beforeunload', componentCleanup);
    };
  }, []);

  const componentCleanup = () => {
    if (inputRef.current?.value !== null)
      localStorage.setItem('search', inputRef.current?.value as string);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          value={value}
          ref={inputRef}
          onChange={handleChange}
        />
        <button className={s.searchBtn} type={'submit'}></button>
      </form>
    </div>
  );
};

export default Search;
