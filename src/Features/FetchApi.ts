import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { ResponseData } from './CardsSlice';

export const RickAndMortyApi = createApi({
  reducerPath: 'RickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ResponseData, string>({
      query: (currentPage) => ({
        url: '',
        params: { page: currentPage },
      }),
    }),
  }),
});
