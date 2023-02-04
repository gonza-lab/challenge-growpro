import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Bycicle from '../../interfaces/Bycicle';
import { selectBycicleById } from '../../state/bycicles/slice';
import { RootState } from '../../state/store';

import BycicleFormComponent from '../../components/Organisms/BycicleForm';

const BycicleForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const bycicle = useSelector<RootState, Bycicle | undefined>((state) =>
    selectBycicleById(state, id as EntityId)
  );
  if (!bycicle) navigate('/');

  return (
    <Container component="main" maxWidth="xl" sx={{ my: 4 }}>
      <Box sx={{ mb: 4, display: 'flex' }}>
        <Link to="/">
          <MuiLink href="/">
            <ArrowBackIcon sx={{ mr: 1 }} />
            <Typography>Go back</Typography>
          </MuiLink>
        </Link>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12} sx={{ height: { xs: '250px', md: 'auto' } }}>
          <Paper sx={{ height: '100%', borderRadius: 4 }} elevation={3}>
            <img
              src={bycicle?.image}
              alt="bycicle"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </Paper>
        </Grid>
        <Grid item md={7} xs={12} sx={{ height: { xs: 'auto', md: 668 } }}>
          {bycicle && <BycicleFormComponent bycicle={bycicle} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BycicleForm;
