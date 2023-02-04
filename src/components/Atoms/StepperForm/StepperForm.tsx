import { FC } from 'react';
import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface StepperFormProps {
  steps: string[];
  activeStep: number;
}

const StepperForm: FC<StepperFormProps> = ({ steps, activeStep }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const { t } = useTranslation();

  return (
    <Stepper
      activeStep={activeStep}
      sx={{ pt: 3, pb: 5 }}
      orientation={isDesktop ? 'horizontal' : 'vertical'}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{t(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperForm;
