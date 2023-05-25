import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

import ModalWindow from '../../components/Modal/Modal';

import { useSelector } from 'react-redux';
import { getPagesNum, getCurrentPage } from '../../Features/CardsSlice';

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

const baseUrl = '/';
const MainPage = () => {
  const pages = useSelector(getPagesNum);
  const currentPage = useSelector(getCurrentPage);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('default');
  const [windowUrl, setWindowUrl] = useState(baseUrl);
  const [totalCount, setTotalCount] = useState<number | undefined>(pages || 1);

  const link = windowUrl === baseUrl ? '/form' : '/';
  const buttonText = isOpen ? 'Close Window' : 'Create new Card';

  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  useEffect(() => {
    setTotalCount(pages);
  }, [pages]);

  const onCreateCard = () => {
    setIsOpen(!isOpen);
    console.log(windowUrl + ' ' + baseUrl);
    setWindowUrl(windowUrl === baseUrl ? '/form' : '/');
  };

  const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSelectValue(sortOption);
  };
  return (
    <div data-testid={'mainPageTest'} className={s.main}>
      <h1>Welcome to our main page</h1>
      {isOpen && <CreateCard />}
      <Link to={link}>
        <button data-testid={'btnCreateTest'} className={s.windowBtn} onClick={onCreateCard}>
          {buttonText}
        </button>
      </Link>

      {isOpenDescription && <ModalWindow setIsOpen={setIsOpenDescription} />}

      <div className={s.paginatorWrapper}>
        <Pagination totalCount={totalCount} currentPage={currentPage} />

        <div className={s.typeSelect}>
          <select
            id={'selectSort'}
            value={selectValue}
            data-testid={'selectSortTest'}
            onChange={onChangeSort}
          >
            <option value="default">По умолчанию</option>
            <option value="name">По имени</option>
            <option value="status">По статусу</option>
          </select>
        </div>
      </div>

      <CardList
        selectValue={selectValue}
        currentPage={currentPage}
        setIsOpen={setIsOpenDescription}
      />
    </div>
  );
};

export default MainPage;
