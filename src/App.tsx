import { Route, Routes } from 'react-router-dom';
import Layout from './components/Atoms/Layout/Layout';

import NotFoundPage from './pages/404';
import BycicleForm from './pages/BycicleForm';
import BycicleHome from './pages/BycicleList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { readAllBycicles } from './state/bycicles/reducer';
import { AppDispatch, RootState } from './state/store';
import { BycicleState, BycicleStatus } from './state/bycicles/slice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector<RootState, BycicleState>(
    (state) => state.bycicles
  );

  useEffect(() => {
    // IMPROVE THIS
    if (status !== BycicleStatus.loadingBycicles) {
      dispatch(readAllBycicles());
    }
  }, []);

  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<BycicleHome />} />
        <Route path=":id" element={<BycicleForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
