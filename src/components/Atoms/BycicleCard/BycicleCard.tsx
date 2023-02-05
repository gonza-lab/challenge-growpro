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
import NUMBER_BASE_DAYS from '../../../constants/NumberBaseDays';
import { useTranslation } from 'react-i18next';
import BYCICLES from '../../../constants/Bycicle';
import CHIP_BY_TYPE from '../../../constants/Chip';

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
              label={t('bycicle.type.' + BYCICLES[type])}
              color={CHIP_BY_TYPE[type].color}
              size="small"
            />
          </Typography>
          <Typography color="text.secondary">
            {NUMBER_BASE_DAYS[type]
              ? t('bycicle_card.number_base_days', {
                  numberBaseDays: NUMBER_BASE_DAYS[type],
                })
              : // ? `The first ${NUMBER_BASE_DAYS[type]} days cost the base price`
                '‎'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BycicleCard;
