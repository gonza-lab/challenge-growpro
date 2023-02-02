import { Route, Routes } from 'react-router-dom';
import Layout from './components/Atoms/Layout/Layout';

import NotFoundPage from './pages/404';
import BycicleForm from './pages/BycicleForm';
import BycicleHome from './pages/BycicleList';

const App = () => {
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
