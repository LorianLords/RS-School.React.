import './Header.module.css';
import React, { useEffect, useRef, useState } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.addEventListener('beforeunload', componentCleanup);
    const input = localStorage.getItem('search');
    if (input !== null) setValue(input);

    return () => {
      window.removeEventListener('beforeunload', componentCleanup);
    };
  }, []);

  const componentCleanup = () => {
    if (inputRef.current?.value !== null)
      localStorage.setItem('search', inputRef.current?.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы
    const input = event.currentTarget.search.value; // получаем доступ к полю ввода
    localStorage.setItem('search', input);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerSection}>
          <div className={s.headerLogo}>DYO</div>
          <div className={s.headerSearch}>
            <form id={s['search-form']} role="search" onSubmit={handleSubmit}>
              <input
                id="search"
                placeholder="Search"
                type="search"
                className={s.searchInput}
                name="q"
                value={value}
                ref={inputRef}
                onChange={handleChange}
              />
              <button className={s.searchBtn} type={'submit'}></button>
            </form>
          </div>
        </div>
        <div className={s.headerItems}>
          <Link to={'/main'} className={s.headerItem}>
            Main
          </Link>
          <Link to={'/aboutus'} className={s.headerItem}>
            About Us
          </Link>
          <div className={s.headerItem}>Cards</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
