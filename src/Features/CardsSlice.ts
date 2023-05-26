import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICES_NAMES } from '../shared/consts';
import { RickAndMortyCardProps } from '../shared/interfaces';

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

export const { setModalWindow, setSearchValue, pushCardData, setCardsPages, setCurrentPage } =
  cardSlice.actions;

export default cardSlice.reducer;
