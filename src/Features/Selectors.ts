import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const getCards = (state: RootState) => state.cards;
export const getCardData = createSelector([getCards], (state) => {
  return state.cardData;
});

export const getCurrentPage = createSelector([getCards], (state) => {
  return state.currentPage;
});

export const getCardModalId = createSelector([getCards], (state) => {
  return state.modalWindowId;
});

export const getPagesNum = createSelector([getCards], (state) => {
  return state.pages;
});
export const getSearchValue = createSelector([getCards], (state) => {
  return state.searchValue;
});
