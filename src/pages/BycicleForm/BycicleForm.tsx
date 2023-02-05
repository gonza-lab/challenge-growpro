import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';
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
import CHIP_BY_TYPE from '../../constants/Chip';
import BYCICLES from '../../constants/Bycicle';

const BycicleForm = () => {
  const { t } = useTranslation();
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
        <MuiLink component={Link} to="/">
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography>{t('go_back')}</Typography>
        </MuiLink>
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
            height: { xs: '250px', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h3" fontWeight="300">
              {bycicle?.name} |
            </Typography>
            <Chip
              sx={{ ml: 2 }}
              size="medium"
              label={t('bycicle.type.' + BYCICLES[bycicle?.type || 0])}
              color={CHIP_BY_TYPE[bycicle?.type || 0].color}
            />
          </Box>
          <Paper
            sx={{ height: '100%', borderRadius: 4, position: 'relative' }}
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
        <Grid item md={7} xs={12} sx={{ height: { xs: 'auto', md: 668 } }}>
          {bycicle && <BycicleFormComponent bycicle={bycicle} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BycicleForm;
