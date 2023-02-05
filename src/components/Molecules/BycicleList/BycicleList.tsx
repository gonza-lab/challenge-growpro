import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';

import {
  BycicleState,
  BycicleStatus,
  selectByciclesIds,
} from '../../../state/bycicles/slice';
import { RootState } from '../../../state/store';
import BycicleCard from '../../Atoms/BycicleCard';
import Spinner from '../../Atoms/Spinner';

const BycicleList = () => {
  const { status } = useSelector<RootState, BycicleState>(
    (state) => state.bycicles
  );
  const ids = useSelector(selectByciclesIds);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {status === BycicleStatus.loadingBycicles ? (
          <Grid item xs={12}>
            <Spinner />
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
