import s from './Cards.module.css';
import React from 'react';
import Card, { CardProps } from './Card/Card';

interface CardsProps {
  cards: CardProps[];
}

const Cards = (props: CardsProps) => {
  const { cards } = props;
  console.log(props);
  return (
    <div className={s.cards}>
      {cards.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          tripName={card.tripName}
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
