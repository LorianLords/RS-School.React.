import React, { useCallback, useContext, useEffect, useState } from 'react';
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
} from '../../Features/CardsSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks';

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
  const error = useSelector(getCardsError);
  const pages = useSelector(getPagesNum);


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [cardState, setCardState] = useState({});
  //const [error, setError] = useState<string | undefined>('');
  const { value, setValue } = useContext(MyContext) as IuseState;
  const [selectValue, setSelectValue] = useState<string>('default');
  const [cardList, setCardList] = useState<RickAndMortyCardProps[]>([]);
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
    console.log('useEffect');
    console.log(status);
    if (status === 'idle') {
      dispatch(fetchCards(currentPage || 1) as unknown as AnyAction);
    }
    if (status === 'succeeded') {
      const sortData = Sorting(selectValue, cards);
      setTotalCount(pages);
      setCardList(sortData);
    }
  }, [status, dispatch, currentPage]);

  const updateCardList = useCallback((card: CardProps) => {
    setCardList((prev) => [...prev, card]);
  }, []);

  const onCreateCard = () => {
    /* setWindowUrl(windowUrl === baseUrl ? 'createcard/' : baseUrl);
    setIsOpen((current) => !current);*/
    document.body.classList.add('modalOpen');
    setIsOpenDescription(true);
  };

  const Sorting = (selectValue = 'default', dataList: RickAndMortyCardProps[]) => {
    console.log(selectValue);
    if (selectValue === 'default') return dataList;
    const key = selectValue as keyof RickAndMortyCardProps;
    return dataList.sort((a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
      (a?.[key] || '') > (b?.[key] || '') ? 1 : -1
    );
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
      {isOpenDescription && (
        <ModalWindow
          cardState={cardState as RickAndMortyCardProps}
          setIsOpen={setIsOpenDescription}
        />
      )}
      <div className={s.paginatorWrapper}>
        <Pagination totalCount={totalCount} setCurrentPage={setCurrentPage} />

        <div className={s.typeSelect}>
          <select
            id={'selectSort'}
            value={selectValue}
            data-testid={'selectSearchTest'}
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
          >
            <option value="default">По умолчанию</option>
            <option value="name">По имени</option>
            <option value="status">По статусу</option>
          </select>
        </div>
      </div>

      <CardList setIsOpen={setIsOpenDescription} setCardState={setCardState} />
    </div>
  );
};

export default MainPage;
