import * as toolkitRaw from '@reduxjs/toolkit';
import IRTK from './Features/IRTK';
import cardsReducer from './Features/CardsSlice';
import { RickAndMortyApi } from './Features/FetchApi';
import { PreloadedState } from 'redux';

const { configureStore, combineReducers } = ((toolkitRaw as IRTK).default ??
  toolkitRaw) as typeof toolkitRaw;

const rootReducer = combineReducers({
  cards: cardsReducer,
  [RickAndMortyApi.reducerPath]: RickAndMortyApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RickAndMortyApi.middleware),
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RickAndMortyApi.middleware),
    preloadedState,
  });
};

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
