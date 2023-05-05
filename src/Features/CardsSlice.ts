import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import { RickAndMortyCardProps } from '../Pages/MainPage/MainPage';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import cardList from '../components/CardList/CardList';
import { RootState } from '../store';
import { searchSlice } from './SearchSlice';
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
type FetchDataThunk = AsyncThunk<ResponseData, number, Record<string, never>>;

interface CardsState {
  cardList: RickAndMortyCardProps[];
  pages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchValue: string;
  error: string | null;
  modalWindow: RickAndMortyCardProps | undefined;
}
const initialState: CardsState = {
  cardList: [],
  pages: 0,
  searchValue: '',
  status: 'idle',
  error: null,
  modalWindow: undefined,
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async ({ currentPage, searchValue }: fetchType) => {
    const options = searchValue && `&name=${searchValue}`;
    //const options = value && `&name=${value}`;
    const response = await axios.get(BASE_URL + `?page=${currentPage}` + options);
    return response.data;
    /*(await response.data) as RickAndMortyCardProps[];*/
  }
);

const Sorting = (selectValue = 'default', dataList: RickAndMortyCardProps[]) => {
  if (selectValue === 'default') selectValue = 'id';
  const key = selectValue as keyof RickAndMortyCardProps;
  return [...dataList].sort((a: RickAndMortyCardProps, b: RickAndMortyCardProps) =>
    (a[key] || '') > (b[key] || '') ? 1 : -1
  );
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    pushCardData(state, action) {
      debugger;
      console.log(state.cardList.unshift(action.payload.card));
      window.alert(state.cardList[0].id);
    },
    changeStatus(state, action) {
      state.status = action.payload;
    },
    setModalWindow(state, action) {
      state.modalWindow = state.cardList.find((card) => {
        return card.id === action.payload.id;
      });
      if (!state.modalWindow) state.error = 'Card data is missing';
    },
    sortState(state, action) {
      state.cardList = Sorting(action.payload.selectValue, state.cardList); // ???
    },
    setSearchValue(state, action) {
      debugger;
      state.searchValue = action.payload;
      state.status = 'idle';
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
        if (action.error.code === 'ERR_NETWORK') {
          state.error = "Network isn't working";
        } else if (action.error.code === 'ERR_BAD_REQUEST') {
          state.error = 'The character you are looking for is missing. Try another name';
        } else state.error = action.error.message as string;
      });
  },
});

export const selectCardList = (state: RootState) => state.cards.cardList;
export const getCardsStatus = (state: RootState) => state.cards.status;
export const getCardsError = (state: RootState) => state.cards.error;
export const getCardModal = (state: RootState) => state.cards.modalWindow;
export const getPagesNum = (state: RootState) => state.cards.pages;
export const getSearchValue = (state: RootState) => state.cards.searchValue;
export const { changeStatus, setModalWindow, sortState, setSearchValue, pushCardData } =
  cardSlice.actions;

export default cardSlice.reducer;
