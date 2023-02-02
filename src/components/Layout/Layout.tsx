import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Box sx={{ height: 183 }}></Box>
      <Footer />
    </>
  );
};

export default Layout;
