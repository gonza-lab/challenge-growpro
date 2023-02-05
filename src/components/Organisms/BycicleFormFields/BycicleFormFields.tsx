import { FC, ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonalInformationForm from '../PersonalInformationForm';
import BillingAddressForm from '../../Atoms/BillingAddressForm';
import PaymentForm from '../../Atoms/PaymentForm';
import OrderSummary from '../../Atoms/OrderSummary';
import Bycicle from '../../../interfaces/Bycicle';

interface BycicleFormFieldsProps {
  activeStep: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: { [name: string]: boolean };
  setValue: (name: string, value: any) => void;
  stepsLength: number;
  form: any;
  bycicle: Bycicle;
  price: { total: number; bill: string };
}

const BycicleFormFields: FC<BycicleFormFieldsProps> = ({
  activeStep,
  onChange,
  errors,
  setValue,
  stepsLength,
  form,
  price,
  bycicle,
}) => {
  const { t } = useTranslation();
  return (
    <form style={{ height: '100%' }} id="bycicle-form">
      <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
        <Typography variant="h6" gutterBottom mt={2}>
          {t('bycicle_form.steps.personal_information')}
        </Typography>
        <PersonalInformationForm
          onChangeInput={onChange}
          errors={errors}
          setValue={setValue}
          values={form}
        />
      </Box>
      <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
        <BillingAddressForm
          onChangeInput={onChange}
          errors={errors}
          values={form}
        />
      </Box>
      <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
        <PaymentForm onChangeInput={onChange} errors={errors} values={form} />
      </Box>
      <Box sx={{ display: activeStep === stepsLength - 1 ? 'block' : 'none' }}>
        <OrderSummary values={form} bycicle={bycicle} {...price} />
      </Box>
    </form>
  );
};

export default BycicleFormFields;
