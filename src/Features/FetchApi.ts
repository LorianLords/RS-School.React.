import { ResponseData, SLICES_NAMES } from './CardsSlice';
import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';
import IRTK from './IRTK';
export type fetchDataType = {
  searchValue: string;
  currentPage: number | undefined;
};

const { createApi, fetchBaseQuery } = ((rtkQuery as IRTK).default ?? rtkQuery) as typeof rtkQuery;

export const RickAndMortyApi = createApi({
  reducerPath: SLICES_NAMES.Api,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ResponseData, fetchDataType>({
      query: ({ searchValue = '', currentPage = 1 }) => ({
        url: '/character',
        params: { page: currentPage, name: searchValue },
      }),
    }),
    getSearchCharacters: builder.query<ResponseData, string>({
      query: (searchValue, currentPage = 1) => ({
        url: '/character',
        params: {
          page: currentPage,
          name: searchValue,
        },
      }),
    }),
    getCharacters: builder.query<ResponseData, string>({
      query: (name = '') => `character/?name=${name}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetSearchCharactersQuery } = RickAndMortyApi;
