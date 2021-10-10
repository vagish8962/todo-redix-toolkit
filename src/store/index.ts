import { configureStore, Selector } from '@reduxjs/toolkit';

import {
  useDispatch as useDispatchOriginal,
  useSelector as useSelectorOriginal,
} from 'react-redux';

import reducer from './rootReducer';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchOriginal<AppDispatch>();
export const useSelector = <R = unknown>(selector: Selector<RootState, R>): R =>
  useSelectorOriginal<RootState, R>(selector);

export const getRootStore = () => {
  return store;
};

export default store;
