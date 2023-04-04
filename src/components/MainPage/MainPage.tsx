import React, { Component, useEffect, useState } from 'react';
import Cards from './Cards/Cards';
import CreateCard from '../CreateCard/CreateCard';
import s from './MainPage.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { CardProps } from './Cards/Card/Card';

const CardListDefault = [
  {
    id: 1,
    tripName: 'Trip to the eiffel tower',
    tripDate: '27.04.2023',
    tripType: 'Tourist bus',
    overnightStay: true,
    tripImg: 'https://www.theindiantalks.com/uploads/7bfa32686d200c64cb46de03ac2eac0d.jpg',
  },
  {
    id: 2,
    tripName: 'History of Brooklyn',
    tripDate: '25.04.2023',
    tripType: 'Walking tour',
    overnightStay: false,

    tripImg: 'https://i.pinimg.com/originals/f4/11/b9/f411b9368b8ba682e8f176a441090853.jpg',
  },
  {
    id: 3,
    tripName: 'Museum of Nebraska ',
    tripDate: '17.06.2023',
    tripType: 'Tourist bus',
    overnightStay: false,
    tripImg: 'https://i.pinimg.com/originals/3a/c8/62/3ac862c908711cb303bed9b1029b7b51.jpg',
  },
  {
    id: 4,
    tripName: 'Hudson river. Beyond New-york City',
    tripDate: '27.04.2023',
    tripType: 'Water Transport',
    overnightStay: false,
    tripImg: 'https://img3.goodfon.com/wallpaper/nbig/7/2b/manhattan-new-york-city-6897.jpg',
  },
  {
    id: 5,
    tripName: 'Washington D.C. is a Capital',
    tripDate: '06.07.2023',
    tripType: 'Tourist bus',
    overnightStay: true,
    tripImg: 'https://rus.wantsee.world/wp-content/uploads/2021/04/visit-Washington-D.C..jpg',
  },
];

const MainPage = () => {
  /*constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
      cardList: CardList,
    };
    this.updateCardList = this.updateCardList.bind(this);
  }*/
  const [isOpen, setIsOpen] = useState(false);
  const [cardList, setCardList] = useState<CardProps[]>(CardListDefault);
  useEffect(() => {});

  const updateCardList = (card: CardProps) => {
    setCardList((prev) => [...prev, card]);
  };

  return (
    <div className={s.main}>
      <h1>Welcome to our main page</h1>
      {/* <Outlet context={updateCardList} />*/}
      {!isOpen ? (
        <NavLink to={`createcard/`}>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Create new Card
          </button>
        </NavLink>
      ) : (
        <>
          <CreateCard updateCardList={updateCardList} />
          <NavLink to={`./`}>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close Window
            </button>
          </NavLink>
        </>
      )}

      <Cards cards={cardList} />
    </div>
  );
};

export default MainPage;
