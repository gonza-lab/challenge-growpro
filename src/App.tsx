import { Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/404';
import BycicleDetail from './pages/BycicleDetail';
import BycicleList from './pages/BycicleList';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<BycicleList />} />
        <Route path=":id" element={<BycicleDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
