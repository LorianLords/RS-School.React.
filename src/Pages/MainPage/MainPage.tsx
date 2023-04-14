import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import { CardListDefault } from '../../components/CardList/TripsData';
import axios, { AxiosError } from 'axios';
import Pagination from '../../components/Pagination/Pagination';
import { IuseState, MyContext } from '../../App';

type RickAndMortyCardProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  created: string;
  status: string;
  image: string;
  episode?: [];
  location?: { name: string; url: string };
  origin?: { name: string; url: string };
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
    .get(baseUrl + `?page=${pageNumber}` + options)
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
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const { value, setValue } = useContext(MyContext) as IuseState;
  const [selectValue, setSelectValue] = useState<string>('default');
  const [cardList, setCardList] = useState<RickAndMortyCardProps[]>([]);
  const [windowUrl, setWindowUrl] = useState(baseUrl);
  const [totalCount, setTotalCount] = useState<number | undefined>(1);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const link = windowUrl === baseUrl ? 'createcard/' : './';
  const buttonText = isOpen ? 'Close Window' : 'Create new Card';
  /*useEffect(() => {
    let updated = false;
    setIsLoading(true);
    getData(setIsLoading, setError, currentPage).then((data) => {
      if (!updated) {
        setTotalCount(data.info.pages);
        const sortData = data.results.sort((a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
          a.name > b.name ? -1 : 1
        );
        console.log('111');
        console.log(sortData);
        setCardList(sortData);
        setIsLoading(false);
      }
    });
    return () => {
      updated = true;
    };
  }, []);*/

  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  useEffect(() => {
    console.log('useEffect');
    let updated = false; //useEffect в любом случае отправит 2 раза запрос а мы просто избегаем 2 присвоения данных от запроса
    setIsLoading(true);
    getData(setError, currentPage, value).then((data) => {
      if (!updated) {
        const sortData = Sorting(selectValue, data.results);
        setTotalCount(data.info.pages);
        setCardList(sortData);
        setIsLoading(false);
      }
    });

    return () => {
      updated = true;
    };
  }, [currentPage, value, selectValue]);

  const updateCardList = useCallback((card: CardProps) => {
    setCardList((prev) => [...prev, card]);
  }, []);

  const onCreateCard = () => {
    setWindowUrl(windowUrl === baseUrl ? 'createcard/' : baseUrl);
    setIsOpen((current) => !current);
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
      {isOpen && <CreateCard updateCardList={updateCardList} />}
      <Link to={link}>
        <button className={s.windowBtn} onClick={onCreateCard}>
          {buttonText}
        </button>
      </Link>

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

      {error ? <p>{error}</p> : isLoading ? <p>Loading...</p> : <CardList cards={cardList} />}
    </div>
  );
};

export default MainPage;
