import { createAsyncThunk } from '@reduxjs/toolkit';

const readAll = createAsyncThunk('bycicles/read_all', async () => {
  const res = await fetch('/api/bycicles');
  const json = await res.json();

  return json;
});

export { readAll as readAllBycicles };
