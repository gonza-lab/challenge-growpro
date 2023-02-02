import {
  Box,
  Button,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import BillingAddressForm from '../BillingAddressForm';
import OrderSummary from '../OrderSummary';
import PaymentForm from '../PaymentForm';
import PersonalInformationForm from '../PersonalInformationForm';

const steps = [
  'Personal information',
  'Billing address',
  'Payment details',
  'Review your order',
];

const groupsOfForm = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['address1', 'city', 'zip', 'country'],
  ['cardName', 'cardNumber', 'expDate', 'cvv'],
];

export type Inputs = {
  firstName: string;
  lastName: string;
  addresLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  zip: number;
  country: string;
};

const BycicleForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { handleChange, form, validate, errors, setValue } = useForm({
    fields: {
      firstName: { required: true },
      lastName: { required: true },
      email: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
      phone: { required: true },
      address1: { required: true },
      city: { required: true },
      zip: { required: true },
      country: { required: true },
      cardName: { required: true },
      cardNumber: { required: true, min: 16 },
      expDate: { required: true, min: 5 },
      cvv: { required: true, min: 3 },
    },
  });

  const handleNext = () => {
    let isValid = true;
    groupsOfForm[activeStep]?.forEach((field) => {
      isValid = validate(field) && isValid;
    });

    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      console.log(form);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form>
          <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
            <PersonalInformationForm
              onChangeInput={handleChange}
              errors={errors}
              setValue={setValue}
            />
          </Box>
          <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
            <BillingAddressForm onChangeInput={handleChange} errors={errors} />
          </Box>
          <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
            <PaymentForm onChangeInput={handleChange} errors={errors} />
          </Box>
          <Box
            sx={{ display: activeStep === steps.length - 1 ? 'block' : 'none' }}
          >
            <OrderSummary values={form as any} />
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}
          >
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default BycicleForm;
