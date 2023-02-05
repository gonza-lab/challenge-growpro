import { FC } from 'react';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BYCICLES from '../../../constants/Bycicle';
import CHIP_BY_TYPE from '../../../constants/Chip';

interface BycicleTypeChipProps {
  type: 0 | 1 | 2;
  size?: 'small' | 'medium' | undefined;
}

const BycicleTypeChip: FC<BycicleTypeChipProps> = ({
  type,
  size = 'medium',
}) => {
  const { t } = useTranslation();

  return (
    <Chip
      size={size}
      label={t('bycicle.type.' + BYCICLES[type])}
      color={CHIP_BY_TYPE[type].color}
    />
  );
};

export default BycicleTypeChip;
