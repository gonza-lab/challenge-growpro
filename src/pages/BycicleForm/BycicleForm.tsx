import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import BycicleFormComponent from '../../components/Molecules/BycicleForm';
import { useSelector } from 'react-redux';
import { selectBycicleById } from '../../state/bycicles/slice';
import { RootState } from '../../state/store';
import Bycicle from '../../interfaces/Bycicle';
import { EntityId } from '@reduxjs/toolkit';

const BycicleForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const bycicle = useSelector<RootState, Bycicle | undefined>((state) =>
    selectBycicleById(state, id as EntityId)
  );
  if (!bycicle) navigate('/');

  return (
    <Container component="main" maxWidth="xl" sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <img
            src={bycicle?.image}
            alt="bycicle"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          {bycicle && <BycicleFormComponent bycicle={bycicle} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BycicleForm;
