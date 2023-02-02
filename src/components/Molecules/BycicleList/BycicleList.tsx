import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import {
  BycicleState,
  BycicleStatus,
  selectByciclesIds,
} from '../../../state/bycicles/slice';
import { RootState } from '../../../state/store';
import BycicleCard from '../../Atoms/BycicleCard';

const BycicleList = () => {
  const { status } = useSelector<RootState, BycicleState>(
    (state) => state.bycicles
  );
  const ids = useSelector(selectByciclesIds);

  return (
    <Container sx={{ py: { xs: 2, md: 8 } }} maxWidth="xl">
      <Grid container spacing={4}>
        {status === BycicleStatus.loadingBycicles ? (
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          ids.map((id) => (
            <Grid item key={id} xs={12} md={4}>
              <BycicleCard id={id} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BycicleList;
