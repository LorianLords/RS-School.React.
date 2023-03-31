import s from './Cards.module.css';
import React, { Component } from 'react';
import Card, { CardProps } from './Card/Card';

interface CardsProps {
  cards: CardProps[];
}

const Cards = (props: CardsProps) => {
  const { cards } = props;

  return (
    <div className={s.cards}>
      {cards.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          name={card.name}
          tripDate={card.tripDate}
          tripType={card.tripType}
          overnightStay={card.overnightStay}
          tripImg={card.tripImg}
        />
      ))}
    </div>
  );
};

export default Cards;

