import Box from '@mui/material/Box';
import Hero from '../../components/Atoms/Hero';
import BycicleList from '../../components/Molecules/BycicleList';

const BycicleHome = () => {
  return (
    <Box component="main" sx={{ paddingBottom: 1 }}>
      <Hero />
      <BycicleList />
    </Box>
  );
};

export default BycicleHome;
