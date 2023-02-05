import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface BycicleFormActionsProps {
  activeStep: number;
  onBack: () => void;
  onNext: () => void;
  stepsLength: number;
}

const BycicleFormActions: FC<BycicleFormActionsProps> = ({
  activeStep,
  onBack,
  onNext,
  stepsLength,
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {activeStep !== 0 && (
        <Button onClick={onBack} sx={{ mt: 3, ml: 1 }}>
          {t('bycicle_form.back')}
        </Button>
      )}
      <Button variant="contained" onClick={onNext} sx={{ mt: 3, ml: 1 }}>
        {activeStep === stepsLength - 1
          ? t('bycicle_form.submit.btn')
          : t('bycicle_form.next')}
      </Button>
    </Box>
  );
};

export default BycicleFormActions;
