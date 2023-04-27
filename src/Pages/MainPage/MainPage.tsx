import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import axios, { AxiosProgressEvent } from 'axios';
import Pagination from '../../components/Pagination/Pagination';
import { IuseState, MyContext } from '../../App';
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
const getData = (
  setError: React.Dispatch<string | undefined>,
  pageNumber: number | undefined,
  value?: string
) => {
  const baseUrl = 'https://rickandmortyapi.com/api/character/';
  const options = value && `&name=${value}`;

  return axios
    .get(baseUrl + `?page=${pageNumber}` + options, {
      onDownloadProgress: function (progressEvent: AxiosProgressEvent) {
        console.log({ progressEvent });
        /* if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(percentCompleted + '%');
        }*/
      },
    })
    .then((resp) => {
      setError('');
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 'ERR_NETWORK') {
        setError("Network isn't working");
      }
      if (err.code === 'ERR_BAD_REQUEST') {
        setError('The character you are looking for is missing. Try another name');
      }
    });
};

const baseUrl = './';
const MainPage = () => {
  const dispatch = useAppDispatch();
  const cards = useSelector(selectCardList);
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

  /*useEffect(() => {
    setIsLoading(true);
    getData(setError, currentPage, value).then((data) => {
      const sortData = Sorting(selectValue, data.results);
      setTotalCount(data.info.pages);
      setCardList(sortData);
      setIsLoading(false);
    });
  }, [currentPage, value, selectValue]);*/

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
    /* setWindowUrl(windowUrl === baseUrl ? 'createcard/' : baseUrl);
    setIsOpen((current) => !current);*/
    document.body.classList.add('modalOpen');
    setIsOpenDescription(true);
  };

  /*const Sorting = (selectValue = 'default', dataList: RickAndMortyCardProps[]) => {
    if (selectValue === 'default') return dataList;
    const key = selectValue as keyof RickAndMortyCardProps;
    return [...dataList].sort((a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
      (a[key] || '') > (b[key] || '') ? 1 : -1
    );
  };*/

  const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSelectValue(sortOption);
  };
  return (
    <div className={s.main}>
      <h1>Welcome to our main page</h1>
      {/*{isOpen && <CreateCard updateCardList={updateCardList} />}*/}
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
