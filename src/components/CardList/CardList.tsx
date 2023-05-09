import s from './Cards.module.css';
import React, { useMemo } from 'react';
import Card, { CardProps } from './Card/Card';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCardData,
  getCardsStatus,
  getSearchValue,
  setCardsPages,
} from '../../Features/CardsSlice';
import { useSelector } from 'react-redux';
import { useGetAllCharactersQuery } from '../../Features/FetchApi';
import { RickAndMortyCardProps } from '../../Pages/MainPage/MainPage';

type CardsProps = {
  setIsOpen: React.Dispatch<boolean>;
  currentPage: number | undefined;
  selectValue: string | undefined;
};

const CardList = ({ setIsOpen, currentPage, selectValue }: CardsProps) => {
  // const cards = useSelector(selectCardList);
  //const error = useAppSelector(getCardsError);
  //const status = useAppSelector(getCardsStatus);
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(getSearchValue);
  const newCard = useAppSelector(getCardData);

  const {
    data: cards,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllCharactersQuery({ searchValue, currentPage });

  isSuccess && dispatch(setCardsPages(cards.info));
  //newCard && cards?.results.unshift(newCard);

  /* !isLoading && dispatch(setCardlist(cards));
  const cardList = useAppSelector(getCardList);*/

  const sortedPosts = useMemo(() => {
    if (selectValue === 'default') selectValue = 'id';
    const sortedPosts = cards?.results || [];
    const key = selectValue as keyof RickAndMortyCardProps;
    const cardsSorted = [...sortedPosts].sort(
      (a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
        (a[key] || '') > (b[key] || '') ? 1 : -1
    );
    newCard && cardsSorted.unshift(newCard);
    debugger;
    return cardsSorted;
  }, [cards, selectValue, newCard]);
  console.log(error);
  let content;
  if (isError) {
    content = <p>{error.toString()}</p>;
  } else if (isLoading) {
    content = <Loader />;
  } else {
    content = (
      <div className={s.cards}>
        {sortedPosts.map((card) => (
          <Card key={card.id} card={card} setIsOpen={setIsOpen} />
        ))}
      </div>
    );
  }

  return <>{content}</>;
};

export default React.memo(CardList);
