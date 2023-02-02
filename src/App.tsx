import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NotFoundPage from './pages/404';
import BycicleForm from './pages/BycicleForm';
import BycicleHome from './pages/BycicleHome/';
import { readAllBycicles } from './state/bycicles/reducer';
import { AppDispatch, RootState } from './state/store';
import { BycicleState, BycicleStatus } from './state/bycicles/slice';

import Layout from './components/Layout/Layout';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector<RootState, BycicleState>(
    (state) => state.bycicles
  );

  useEffect(() => {
    if (status !== BycicleStatus.loadingBycicles) {
      dispatch(readAllBycicles());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<BycicleHome />} />
        <Route path="/bycicle/:id" element={<BycicleForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
