import s from './Cards.module.css';
import React, { useMemo } from 'react';
import Card, { CardProps } from './Card/Card';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCardData, getSearchValue } from '../../Features/Selectors';
import { setCardsPages } from '../../Features/CardsSlice';
import { useGetAllCharactersQuery } from '../../Features/FetchApi';
import { RickAndMortyCardProps } from '../../Pages/MainPage/MainPage';

type CardsProps = {
  setIsOpen: React.Dispatch<boolean>;
  currentPage: number | undefined;
  selectValue: string | undefined;
};

const CardList = ({ setIsOpen, currentPage, selectValue }: CardsProps) => {
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

  const sortedPosts = useMemo(() => {
    if (selectValue === 'default') selectValue = 'id';
    const sortedPosts = cards?.results || [];
    const key = selectValue as keyof RickAndMortyCardProps;
    const cardsSorted = [...sortedPosts].sort(
      (a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
        (a[key] || '') > (b[key] || '') ? 1 : -1
    );
    newCard && cardsSorted.unshift(newCard);
    return cardsSorted;
  }, [cards, selectValue, newCard]);

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
