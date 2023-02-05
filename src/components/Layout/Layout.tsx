import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: { xs: 56, md: 68 } }}></Box>
      <Outlet />
      <Box sx={{ height: 183 }}></Box>
      <Footer />
    </>
  );
};

export default Layout;
