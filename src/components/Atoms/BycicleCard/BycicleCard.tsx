import { FC } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import Bycicle from '../../../interfaces/Bycicle';
import { selectBycicleById } from '../../../state/bycicles/slice';
import { RootState } from '../../../state/store';
import NUMBER_BASE_DAYS from '../../../constants/NumberBaseDays';
import BycicleTypeChip from '../BycicleTypeChip';

interface BycicleCardProps {
  id: EntityId;
}

const BycicleCard: FC<BycicleCardProps> = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bycicle = useSelector<RootState, Bycicle | undefined>((state) =>
    selectBycicleById(state, id)
  );

  if (!bycicle) return <></>;
  const { name, image, type } = bycicle;

  return (
    <Card>
      <CardActionArea onClick={() => navigate('/bycicle/' + id)}>
        <CardMedia
          sx={{ height: '250px' }}
          component="img"
          image={image}
          alt="Bycicle"
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
          <Box display="flex" alignItems="center" gap="6px">
            <Typography gutterBottom variant="h5" component="h2" sx={{ m: 0 }}>
              {name}
            </Typography>
            <BycicleTypeChip type={type} size="small" />
          </Box>
          <Typography color="text.secondary">
            {NUMBER_BASE_DAYS[type]
              ? t('bycicle_card.number_base_days', {
                  numberBaseDays: NUMBER_BASE_DAYS[type],
                })
              : '‎'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BycicleCard;
