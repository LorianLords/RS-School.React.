import React, { Component, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom';
import { CardProps } from '../../components/CardList/Card/Card';
import { CardListDefault } from '../../components/CardList/TripsData';
import axios from 'axios';

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
const getAccess = () => {
  /*const clientID = 'r9o946gwg3z1ng03r2mv6jbfvw19pe';
  const clientPass = 'd5kkhpjvr69ca5uqouj5g962cxiv7o';
  return axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientPass}&grant_type=client_credentials`
    )
    .then((resp) => {
      return resp.data.access_token;
    });*/
};

const getData = (/*clientID: string, apiKey: string*/ setIsLoading: React.Dispatch<boolean>) => {
  /* axios
    .post(`https://api.igdb.com/v4/games`, {
      headers: {
        'Client-ID': clientID,
        Authorization: 'Bearer ' + apiKey,
        Body: 'fields name; limit 10;',
      },
    })
    .then((resp) => {
      console.log(resp);
    });*/
  /*  const apiKey1 = 'mop7-pmDYUNiwkqlpc8-';
  const config = {
    headers: { Authorization: 'Bearer ' + apiKey1 },
  };*/
  setIsLoading(true);
  const CardData = {
    gender: 'Male',
    id: 21,
    image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    name: 'Aqua Morty',
    origin: { name: 'unknown', url: '' },
    species: 'Humanoid',
    status: 'unknown',
    type: 'Fish-Person',
  };
  return axios.get(`https://rickandmortyapi.com/api/character/?page=2`).then((resp) => {
    //const cards = resp.data.results.map(card => card = {id: card.id, image: card.image, name: card.name, species: card.species, type: card.type, location: card.location})
    console.log(resp.data.results);
    return resp.data.results as RickAndMortyCardProps[];
  });
};
const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData(setIsLoading).then((data) => {
      setCardList(data);
      console.log(data);
      setIsLoading(false);
    });
    /*getAccess().then((token) => {
      axios({
        url: 'https://api.igdb.com/v4/games',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': clientID,
          Authorization: 'Bearer ' + token,
        },
        data: 'fields name; limit 10;',
      }).then((response) => {
        console.log(response.data);
      });*/
    /* console.log(token);
      setApiKey(token);
      getData(clientID, token);
    });*/
    /*console.log(apiKey);*/
    /*axios.get('https://api.kinopoisk.dev/v1' + character, config).then((response) => {
      const data = response.data;
      console.log(response);
    });*/
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [cardList, setCardList] = useState<RickAndMortyCardProps[]>([]);
  const [windowUrl, setWindowUrl] = useState('./');
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  const clientID = 'r9o946gwg3z1ng03r2mv6jbfvw19pe';
  /*const config = {
    headers: { 'Client-ID': clientID, Authorization: 'Bearer ' + apiKey, Body: 'fields *;' },
  };*/
  /* const character = '/random';*/

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
      {isLoading ? <p>Loading...</p> : <CardList cards={cardList} />}
    </div>
  );
};

export default MainPage;
