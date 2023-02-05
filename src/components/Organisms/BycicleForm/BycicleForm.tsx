import { FC, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Bycicle from '../../../interfaces/Bycicle';
import useForm from '../../../hooks/useForm';
import getByciclePrice from '../../../utils/getByciclePrice';
import PurchaseLocalStorage from '../../../utils/PurchaseLocalStorage';
import toMoneyFormat from '../../../utils/toMoneyFormat';

import StepperForm from '../../Atoms/StepperForm';
import { useTranslation } from 'react-i18next';
import BycicleFormFields from '../BycicleFormFields';

const steps = [
  'bycicle_form.steps.personal_information',
  'bycicle_form.steps.billing_address',
  'bycicle_form.steps.payment_details',
  'bycicle_form.steps.review',
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
  const { t } = useTranslation();
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
    const props = {
      title:
        t('bycicle_form.submit.question', {
          price: toMoneyFormat(price.total),
        }) || '',
      confirmButtonText: t('bycicle_form.submit.confirm_btn'),
      denyButtonText: t('bycicle_form.submit.deny_btn'),
    };

    Swal.fire({
      showDenyButton: true,
      ...props,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(t('bycicle_form.submit.success_msg') || '', '', 'success');

        PurchaseLocalStorage.add({ ...form, bycicleId: bycicle.id } as any);
        navigate('/');
      }
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
      <BycicleFormFields
        activeStep={activeStep}
        onChange={handleChange}
        bycicle={bycicle}
        errors={errors}
        form={form}
        price={price}
        setValue={setValue}
        stepsLength={steps.length}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            {t('bycicle_form.back')}
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          {activeStep === steps.length - 1
            ? t('bycicle_form.submit.btn')
            : t('bycicle_form.next')}
        </Button>
      </Box>
    </Paper>
  );
};

export default BycicleForm;
