import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './Features/SearchSlice';
import cardsReducer from './Features/CardsSlice';
export const store = configureStore({
  reducer: {
    search: searchReducer,
    cards: cardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
