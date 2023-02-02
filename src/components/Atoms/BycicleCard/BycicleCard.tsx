import { FC } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Bycicle from '../../../interfaces/Bycicle';
import { useSelector } from 'react-redux';
import { selectBycicleById } from '../../../state/bycicles/slice';
import { RootState } from '../../../state/store';
import { EntityId } from '@reduxjs/toolkit';

interface BycicleCardProps {
  id: EntityId;
}

const chip: { label: string; color: 'info' | 'success' | 'warning' }[] = [
  { label: 'Electric', color: 'success' },
  { label: 'Normal', color: 'info' },
  { label: 'Old', color: 'warning' },
];

const BycicleCard: FC<BycicleCardProps> = ({ id }) => {
  const navigate = useNavigate();
  const bycicle = useSelector<RootState, Bycicle | undefined>((state) =>
    selectBycicleById(state, id)
  );

  if (!bycicle) return <></>;
  const { name, image, type } = bycicle;

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/' + id)}>
        <CardMedia
          sx={{ height: '200px' }}
          component="img"
          image={image}
          alt="random"
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'flex-start',
          }}
        >
          <Typography gutterBottom variant="h5" component="h2" sx={{ m: 0 }}>
            {name}
            <Chip
              sx={{ ml: 1 }}
              label={chip[type].label}
              color={chip[type].color}
              size="small"
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BycicleCard;
