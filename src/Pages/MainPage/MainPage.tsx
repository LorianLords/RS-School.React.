import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import { CardListDefault } from '../../components/CardList/TripsData';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';

interface RickAndMortyCardProps {
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
}

const getData = (setIsLoading: React.Dispatch<boolean>, pageNumber: number | undefined) => {
  setIsLoading(true);
  return axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`).then((resp) => {
    //const cards = resp.data.results.map(card => card = {id: card.id, image: card.image, name: card.name, species: card.species, type: card.type, location: card.location})
    console.log(resp.data);
    return resp.data;
  });
};

const baseUrl = './';
const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cardList, setCardList] = useState<RickAndMortyCardProps[]>([]);
  const [windowUrl, setWindowUrl] = useState(baseUrl);
  const [totalCount, setTotalCount] = useState<number | undefined>(1);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [prevPage, setPrevPage] = useState();
  useEffect(() => {
    getData(setIsLoading, currentPage).then((data) => {
      setTotalCount(data.info.pages);
      //setNextPage(data.info.pages);
      setCardList(data.results);
      console.log(data);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  useEffect(() => {
    getData(setIsLoading, currentPage).then((data) => {
      setCardList(data.results);
      setIsLoading(false);
    });
  }, [currentPage]);

  const updateCardList = (card: CardProps) => {
    console.log(card);
    setCardList((prev) => [...prev, card]);
  };

  return (
    <div className={s.main}>
      <h1>Welcome to our main page</h1>
      {isOpen ? <CreateCard updateCardList={updateCardList} /> : ''}
      <Link to={windowUrl === './' ? 'createcard/' : './'}>
        <button
          className={s.windowBtn}
          onClick={() => {
            setWindowUrl(windowUrl === './' ? 'createcard/' : './');
            setIsOpen((current) => !current);
          }}
        >
          {isOpen ? 'Close Window' : 'Create new Card'}
        </button>
      </Link>
      <Pagination totalCount={totalCount} setCurrentPage={setCurrentPage} />
      {isLoading ? <p>Loading...</p> : <CardList cards={cardList} />}
    </div>
  );
};

export default MainPage;
