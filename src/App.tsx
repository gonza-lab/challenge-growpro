import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { readAllBycicles } from './state/bycicles/reducer';
import { AppDispatch, RootState } from './state/store';
import { BycicleState, BycicleStatus } from './state/bycicles/slice';

import useScrollToTop from './hooks/useScrollToTop';

import Router from './Router';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector<RootState, BycicleState>(
    (state) => state.bycicles
  );
  useScrollToTop();

  useEffect(() => {
    if (status !== BycicleStatus.loadingBycicles) {
      dispatch(readAllBycicles());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <Router />;
};

export default App;
