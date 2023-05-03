import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import axios, { AxiosProgressEvent } from 'axios';
import Pagination from '../../components/Pagination/Pagination';

import ModalWindow from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCardList,
  getCardsError,
  getCardsStatus,
  fetchCards,
  getPagesNum,
  sortState,
  getSearchValue,
  fetchType,
} from '../../Features/CardsSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks';
import search from '../../components/Search/Search';

export type RickAndMortyCardProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  created: string;
  status: string;
  image: string;
  episode?: [];
  location?: { name: string; url: string };
  origin?: { name: string; url?: string };
  type?: string;
  url?: string;
};

const baseUrl = './';
const MainPage = () => {
  const dispatch = useAppDispatch();
  console.log(1);
  const status = useSelector(getCardsStatus);
  const pages = useSelector(getPagesNum);
  const searchValue = useSelector(getSearchValue);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('default');
  const [windowUrl, setWindowUrl] = useState(baseUrl);
  const [totalCount, setTotalCount] = useState<number | undefined>(1);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);

  const link = windowUrl === baseUrl ? 'createcard/' : './';
  const buttonText = isOpen ? 'Close Window' : 'Create new Card';

  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      const userData: fetchType = {
        currentPage: currentPage || 1,
        searchValue: searchValue,
      };
      dispatch(fetchCards(userData as fetchType));
    }
    if (status === 'succeeded') {
      /*   const sortData = Sorting(selectValue, cards);*/
      dispatch(sortState({ selectValue }));
      setTotalCount(pages);
    }
  }, [status, dispatch, currentPage, selectValue, searchValue]);

  const onCreateCard = () => {
    setIsOpen(!isOpen);
    setWindowUrl(windowUrl === baseUrl ? 'createcard/' : './');
  };

  const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSelectValue(sortOption);
  };
  return (
    <div className={s.main}>
      <h1>Welcome to our main page</h1>
      {isOpen && <CreateCard />}
      <Link to={link}>
        <button className={s.windowBtn} onClick={onCreateCard}>
          {buttonText}
        </button>
      </Link>

      {isOpenDescription && <ModalWindow setIsOpen={setIsOpenDescription} />}

      <div className={s.paginatorWrapper}>
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className={s.typeSelect}>
          <select
            id={'selectSort'}
            value={selectValue}
            data-testid={'selectSearchTest'}
            onChange={onChangeSort}
          >
            <option value="default">По умолчанию</option>
            <option value="name">По имени</option>
            <option value="status">По статусу</option>
          </select>
        </div>
      </div>

      <CardList setIsOpen={setIsOpenDescription} />
    </div>
  );
};

export default MainPage;
