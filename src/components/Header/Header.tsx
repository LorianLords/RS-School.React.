import './Header.module.css';
import React from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerSection}>
          <div className={s.headerLogo}>DYO</div>
          <Search />
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
