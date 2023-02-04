import { FC, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Bycicle from '../../../interfaces/Bycicle';
import useForm from '../../../hooks/useForm';
import BYCICLES from '../../../constants/Bycicle';
import getByciclePrice from '../../../utils/getByciclePrice';
import PurchaseLocalStorage from '../../../utils/PurchaseLocalStorage';
import toMoneyFormat from '../../../utils/toMoneyFormat';

import BillingAddressForm from '../../Atoms/BillingAddressForm';
import OrderSummary from '../../Atoms/OrderSummary';
import PaymentForm from '../../Atoms/PaymentForm';
import PersonalInformationForm from '../PersonalInformationForm';
import StepperForm from '../../Atoms/StepperForm';
import showModal from '../../../utils/showModal';

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

interface BycicleFormProps {
  bycicle: Bycicle;
}

const BycicleForm: FC<BycicleFormProps> = ({ bycicle }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { handleChange, form, errors, setValue, validateFields } = useForm({
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
  const [price, setPrice] = useState<{ total: number; bill: string }>({
    total: 0,
    bill: '',
  });
  const navigate = useNavigate();

  const handleNext = () => {
    let isValid = validateFields(groupsOfForm[activeStep] || []);
    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      handleSubmit();
      return;
    } else if (activeStep === steps.length - 2) {
      setPrice(
        getByciclePrice({
          days: form.numberDays as any,
          startDate: form.startDate as any,
          type: bycicle.type,
        })
      );
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    showModal({
      title:
        'Are you sure you want to make the purchase? Total price: ' +
        toMoneyFormat(price.total),
      callback: () => {
        PurchaseLocalStorage.add({ ...form, bycicleId: bycicle.id } as any);
        navigate('/');
      },
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, md: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <StepperForm steps={steps} activeStep={activeStep} />
      <form style={{ height: '100%' }}>
        <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
          <Typography variant="h6" gutterBottom>
            Information of Bycicle
          </Typography>
          <Typography>
            <b>Type</b>: {BYCICLES[bycicle.type]}
          </Typography>
          <Typography>
            <b>Name</b>: {bycicle.name}
          </Typography>
          <Typography variant="h6" gutterBottom mt={2}>
            Personal Information
          </Typography>
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
          <OrderSummary
            values={form as any}
            bycicle={bycicle}
            total={price.total}
            bill={price.bill}
          />
        </Box>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BycicleForm;