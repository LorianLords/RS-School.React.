import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import { RickAndMortyCardProps } from '../Pages/MainPage/MainPage';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import cardList from '../components/CardList/CardList';
import { RootState } from '../store';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export interface ResponseData {
  info?: {
    pages: number;
  };
  results: RickAndMortyCardProps[];
}
export interface fetchType {
  currentPage: number;
  searchValue: string;
}

interface CardsState {
  cardList: RickAndMortyCardProps[];
  cardData: RickAndMortyCardProps | undefined;
  pages: number;
  currentPage: number;

  searchValue: string;
  error: string | null;
  modalWindowId: number | undefined;
}
const initialState: CardsState = {
  cardList: [],
  cardData: undefined,
  pages: 0,
  currentPage: 1,
  searchValue: '',
  error: null,
  modalWindowId: undefined,
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsPages(state, action) {
      state.pages = action.payload.pages || 0;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    pushCardData(state, action) {
      state.cardData = action.payload.card;
    },
    setModalWindow(state, action) {
      state.modalWindowId = action.payload.id;
    },
    setSearchValue(state, action) {
      state.currentPage = action.payload.currentPage;
      state.searchValue = action.payload.inputValue;
    },
  },
});

export const getCardData = (state: RootState) => state.cards.cardData;
export const getCurrentPage = (state: RootState) => state.cards.currentPage;
export const getCardModalId = (state: RootState) => state.cards.modalWindowId;
export const getPagesNum = (state: RootState) => state.cards.pages;
export const getSearchValue = (state: RootState) => state.cards.searchValue;
export const { setModalWindow, setSearchValue, pushCardData, setCardsPages, setCurrentPage } =
  cardSlice.actions;

export default cardSlice.reducer;
