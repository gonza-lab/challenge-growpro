import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Bycicle from '../../interfaces/Bycicle';
import { selectBycicleById } from '../../state/bycicles/slice';
import { RootState } from '../../state/store';

import BycicleFormComponent from '../../components/Organisms/BycicleForm';
import GoBackButton from '../../components/Atoms/GoBackButton';
import BycicleTypeChip from '../../components/Atoms/BycicleTypeChip';

const BycicleForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const bycicle = useSelector<RootState, Bycicle | undefined>((state) =>
    selectBycicleById(state, id as EntityId)
  );

  useEffect(() => {
    if (!bycicle) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xl" sx={{ my: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: { xs: 2, md: 4 }, display: 'flex' }}>
        <GoBackButton />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          height: { xs: 'auto', md: 668 },
        }}
      >
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                mr: 1,
                fontWeight: 300,
              }}
            >
              {bycicle?.name} |
            </Typography>
            <BycicleTypeChip type={bycicle?.type || 0} />
          </Box>
          <Paper
            sx={{
              borderRadius: 4,
              position: 'relative',
              height: { xs: '250px', md: '100%' },
            }}
            elevation={3}
          >
            <img
              src={bycicle?.image}
              alt="bycicle"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                position: 'absolute',
              }}
            />
          </Paper>
        </Grid>
        <Grid item md={7} xs={12}>
          {bycicle && <BycicleFormComponent bycicle={bycicle} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BycicleForm;
