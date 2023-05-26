import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseData } from './CardsSlice';

type fetchDataType = {
  searchValue: string;
  currentPage: number | undefined;
};
export const RickAndMortyApi = createApi({
  reducerPath: 'RickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ResponseData, fetchDataType>({
      query: ({ searchValue = '', currentPage = 1 }) => ({
        url: '/character',
        params: { page: currentPage, name: searchValue },
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery } = RickAndMortyApi;
