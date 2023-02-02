import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { FC } from 'react';

interface StepperFormProps {
  steps: string[];
  activeStep: number;
}

const StepperForm: FC<StepperFormProps> = ({ steps, activeStep }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Stepper
      activeStep={activeStep}
      sx={{ pt: 3, pb: 5 }}
      orientation={isDesktop ? 'horizontal' : 'vertical'}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperForm;
