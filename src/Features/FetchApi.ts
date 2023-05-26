import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseData } from './CardsSlice';
import { API_URLS, SLICES_NAMES } from '../shared/consts';

type fetchDataType = {
  searchValue: string;
  currentPage?: number;
};
interface CustomError {
  data: {
    message: string;
  };
  status: string;
}
export const RickAndMortyApi = createApi({
  reducerPath: SLICES_NAMES.APIname,
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.baseUrl }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ResponseData, fetchDataType>({
      query: ({ searchValue = '', currentPage = 1 }) => ({
        url: API_URLS.characterPath,
        params: { page: currentPage, name: searchValue },
      }),
    }),
  }),
});

export const { useGetAllCharactersQuery } = RickAndMortyApi;
