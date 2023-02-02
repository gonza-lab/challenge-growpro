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

interface BycicleCardProps extends Bycicle {}

const chip: { label: string; color: 'info' | 'success' | 'warning' }[] = [
  { label: 'Electric', color: 'success' },
  { label: 'Normal', color: 'info' },
  { label: 'Old', color: 'warning' },
];

const BycicleCard: FC<BycicleCardProps> = ({ image, name, type }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/5')}>
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
