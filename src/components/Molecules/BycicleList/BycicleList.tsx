import { Container, Grid } from '@mui/material';
import BycicleCard from '../../Atoms/BycicleCard';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 1, 10];
const BycicleList = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container spacing={4}>
        {list.map((item) => (
          <Grid item key={item} xs={12} md={4}>
            <BycicleCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BycicleList;
