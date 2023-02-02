import { configureStore } from '@reduxjs/toolkit';
import bycicleSlice from './bycicles/slice';

export const store = configureStore({
  reducer: {
    bycicles: bycicleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
