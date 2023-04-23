import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import { RickAndMortyCardProps } from '../Pages/MainPage/MainPage';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import cardList from '../components/CardList/CardList';
import { RootState } from '../store';
import { searchSlice } from './SearchSlice';
const BASE_URL = 'https://rickandmortyapi.com/api/character/';

interface CardsState {
  cardList: RickAndMortyCardProps[];
  pages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
interface ResponseData {
  info?: {
    pages: number;
  };
  results: RickAndMortyCardProps[];
}
type FetchDataThunk = AsyncThunk<ResponseData, number, Record<string, never>>;

const initialState: CardsState = {
  cardList: [],
  pages: 0,
  status: 'idle',
  error: null,
};

export const fetchCards: FetchDataThunk = createAsyncThunk(
  'cards/fetchCards',
  async (numberPage: number) => {
    //const options = value && `&name=${value}`;
    const response = await axios.get(BASE_URL + `?page=${numberPage}`);
    return response.data;
    /*(await response.data) as RickAndMortyCardProps[];*/
  }
);
export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeStatus(state, action) {
      debugger;
      console.log(action.payload.status);
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cardList = action.payload.results;
        state.pages = action.payload.info?.pages || 0;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const selectCardList = (state: RootState) => state.cards.cardList;
export const getCardsStatus = (state: RootState) => state.cards.status;
export const getCardsError = (state: RootState) => state.cards.error;
export const getPagesNum = (state: RootState) => state.cards.pages;

export const { changeStatus } = cardSlice.actions;

export default cardSlice.reducer;
