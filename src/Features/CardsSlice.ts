import * as toolkitRaw from '@reduxjs/toolkit';
import { RickAndMortyCardProps } from '../Pages/MainPage/MainPage';

import { RootState } from '../store';
import IRTK from './IRTK';

const { createSlice } = ((toolkitRaw as IRTK).default ?? toolkitRaw) as typeof toolkitRaw;
export interface ResponseData {
  info?: {
    pages: number;
  };
  results: RickAndMortyCardProps[];
}

interface CardsState {
  cardList: RickAndMortyCardProps[];
  cardData?: RickAndMortyCardProps;
  pages: number;
  currentPage: number;

  searchValue: string;
  error: string | null;
  modalWindowId?: number;
}
const initialState: CardsState = {
  cardList: [],
  pages: 0,
  currentPage: 1,
  searchValue: '',
  error: null,
};

export enum SLICES_NAMES {
  Cards = 'cards',
  Api = 'RickAndMortyApi',
}

export const cardSlice = createSlice({
  name: SLICES_NAMES.Cards,
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
