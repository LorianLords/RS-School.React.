import React, { Component, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import { CardListDefault } from '../../components/CardList/TripsData';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardList, setCardList] = useState<CardProps[]>(CardListDefault);
  const [windowUrl, setWindowUrl] = useState('./');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);
  const updateCardList = (card: CardProps) => {
    console.log(card);
    setCardList((prev) => [...prev, card]);
  };

  return (
    <div className={s.main}>
      <h1>Welcome to our main page</h1>
      {isOpen ? <CreateCard updateCardList={updateCardList} /> : ''}
      <Link to={windowUrl === './' ? 'createcard/' : './'}>
        <button
          className={s.windowBtn}
          onClick={() => {
            setWindowUrl(windowUrl === './' ? 'createcard/' : './');
            setIsOpen((current) => !current);
          }}
        >
          {isOpen ? 'Close Window' : 'Create new Card'}
        </button>
      </Link>
      <CardList cards={cardList} />
    </div>
  );
};

export default MainPage;
