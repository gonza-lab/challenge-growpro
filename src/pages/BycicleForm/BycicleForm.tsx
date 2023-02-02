import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import BycicleFormComponent from '../../components/Molecules/BycicleForm';

const BycicleForm = () => {
  const { id } = useParams();

  return (
    <Container component="main" maxWidth="xl" sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <img
            src="https://source.unsplash.com/random"
            alt="bycicle"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <BycicleFormComponent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BycicleForm;
