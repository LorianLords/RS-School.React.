import s from './Cards.module.css';
import React, { useEffect, useMemo } from 'react';

import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCardData, getSearchValue } from '../../Features/Selectors';
import { setCardsPages } from '../../Features/CardsSlice';
import { useGetAllCharactersQuery } from '../../Features/FetchApi';
import { RickAndMortyCardProps } from '../../shared/interfaces';
import Card from './Card/Card';
import { sortCards } from '../../shared/helpers';

type CardsProps = {
  onOpen: () => void;
  currentPage?: number;
  selectValue?: string;
};

const CardList = ({ onOpen, currentPage, selectValue }: CardsProps) => {
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

  useEffect(() => {
    isSuccess && dispatch(setCardsPages(cards?.info));
  }, [isSuccess]);

  const sortedPosts = useMemo(() => {
    const sortedPosts = cards?.results || [];
    const cardsSorted = sortCards({ sortedPosts, selectValue });
    newCard && cardsSorted.unshift(newCard);
    return cardsSorted;
  }, [cards, selectValue, newCard]);


  const errorMes = error && 'error' in error && error.error;
  return (
    <>
      {isError && <p>{errorMes as string}</p>}
      {isLoading && <Loader />}

      <div className={s.cards}>
        {sortedPosts &&
          sortedPosts.map((card) => <Card onOpen={onOpen} key={card.id} card={card} />)}
      </div>
    </>
  );
};

export default React.memo(CardList);
