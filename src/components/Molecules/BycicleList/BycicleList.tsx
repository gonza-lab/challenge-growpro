import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Bycicle from '../../../interfaces/Bycicle';
import BycicleCard from '../../Atoms/BycicleCard';

const BycicleList = () => {
  const [bycicles, setBycicles] = useState<Bycicle[]>([]);

  useEffect(() => {
    fetch('/api/bycicles')
      .then<Bycicle[]>((res) => res.json())
      .then((json) => {
        setBycicles(json);
      });
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container spacing={4}>
        {bycicles.map((bycicle) => (
          <Grid item key={bycicle.id} xs={12} md={4}>
            <BycicleCard {...bycicle} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BycicleList;
