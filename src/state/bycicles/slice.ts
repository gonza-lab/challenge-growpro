import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import Bycicle from '../../interfaces/Bycicle';
import { RootState } from '../store';
import { readAllBycicles } from './reducer';

enum BycicleStatus {
  idle = 'idle',
  loadingBycicles = 'loading bycicles',
}

export interface BycicleState {
  status: BycicleStatus;
}

const bycicleAdapter = createEntityAdapter<Bycicle>({});

const initialState = bycicleAdapter.getInitialState<BycicleState>({
  status: BycicleStatus.idle,
});

const slice = createSlice({
  name: 'bycicles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(readAllBycicles.pending, (state) => {
      state.status = BycicleStatus.loadingBycicles;
    });
    builder.addCase(readAllBycicles.fulfilled, (state, action) => {
      state.status = BycicleStatus.idle;
      bycicleAdapter.setAll(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllBycicles,
  selectIds: selectByciclesIds,
  selectById: selectBycicleById,
} = bycicleAdapter.getSelectors<RootState>((state) => state.bycicles);

export { BycicleStatus };

export default slice.reducer;
