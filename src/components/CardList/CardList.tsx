import s from './Cards.module.css';
import React from 'react';
import Card, { CardProps } from './Card/Card';

type CardsProps = {
  cards: CardProps[] | undefined;
};

const CardList = (props: CardsProps) => {
  const { cards } = props;
  if (!cards) return <div></div>;
  console.log('CardList');
  console.log(cards);
  return (
    <div className={s.cards}>
      {cards.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          name={card.name}
          created={card.created}
          gender={card.gender}
          species={card.species}
          status={card.status}
          image={card.image}
        />
      ))}
    </div>
  );
};
/*
<Card
  id={card.id}
  key={card.id}
  tripName={card.tripName}
  tripDate={card.tripDate}
  tripType={card.tripType}
  overnightStay={card.overnightStay}
  tripImg={card.tripImg}
/>*/
export default React.memo(CardList);
