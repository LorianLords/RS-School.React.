import './Header.module.css';
import React from 'react';
import s from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import Search from '../Search/Search';

const Header = () => {
  const routeLinks = [
    { title: 'Main', to: '/main' },
    { title: 'About Us', to: '/aboutus' },
    { title: '', to: '' },
  ];
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.headerSection}>
          <div className={s.headerLogo}>DYO</div>
          <Search />
        </div>
        <div className={s.headerItems}>
          {routeLinks.map((route, index) => (
            <NavLink key={index} to={route.to} className={s.headerItem}>
              {route.title}
            </NavLink>
          ))}
          <div className={s.headerItem}>Cards</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
