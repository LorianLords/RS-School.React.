import s from './Cards.module.css';
import React from 'react';
import Card, { CardProps } from './Card/Card';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks';
import { getCardsError, getCardsStatus, selectCardList } from '../../Features/CardsSlice';
import { useSelector } from 'react-redux';

type CardsProps = {
  setIsOpen: React.Dispatch<boolean>;
};

const CardList = ({ setIsOpen }: CardsProps) => {

  const cards = useSelector(selectCardList);
  const error = useAppSelector(getCardsError);
  const status = useAppSelector(getCardsStatus);
  debugger
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : status === 'loading' ? (
        <Loader />
      ) : (
        <div className={s.cards}>
          {cards.map((card) => (
            <Card key={card.id} card={card} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(CardList);
