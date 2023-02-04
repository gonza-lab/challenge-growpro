import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const errorMessages = {
  cardName: 'bycicle_form.fields.card_name.error',
  cardNumber: 'bycicle_form.fields.card_number.error',
  expDate: 'bycicle_form.fields.exp_date.error',
  cvv: 'bycicle_form.fields.cvv.error',
};

interface PaymentFormProps {
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: {
    cardName?: boolean;
    cardNumber?: boolean;
    expDate?: boolean;
    cvv?: boolean;
  };
}

const handleExpDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target.value.length === 2) {
    target.value += '-';
  }
};

const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
};

const handleDelete = ({ key, target }: KeyboardEvent<HTMLInputElement>) => {
  const value = (target as HTMLInputElement).value;
  if (
    (key === 'Delete' || key === 'Backspace') &&
    value[value.length - 1] === '-'
  ) {
    (target as HTMLInputElement).value = '2';
  }
};

const PaymentForm: FC<PaymentFormProps> = ({ onChangeInput, errors }) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('bycicle_form.steps.payment_details')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardName"
            id="cardName"
            label={t('bycicle_form.fields.card_name.label')}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={onChangeInput}
            error={errors.cardName}
            helperText={errors.cardName && t(errorMessages.cardName)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            id="cardNumber"
            label={t('bycicle_form.fields.card_number.label')}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            type="number"
            inputProps={{ maxLength: 16 }}
            onChange={(e) => {
              handleMaxChange(e as ChangeEvent<HTMLInputElement>);
              onChangeInput(e as ChangeEvent<HTMLInputElement>);
            }}
            error={errors.cardNumber}
            helperText={errors.cardNumber && t(errorMessages.cardNumber)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="expDate"
            id="expDate"
            label={t('bycicle_form.fields.exp_date.label')}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            inputProps={{ maxLength: 5 }}
            onChange={(e) => {
              handleExpDateChange(e as ChangeEvent<HTMLInputElement>);
              onChangeInput(e as ChangeEvent<HTMLInputElement>);
            }}
            onKeyDown={handleDelete}
            error={errors.expDate}
            helperText={errors.expDate && t(errorMessages.expDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            required
            name="cvv"
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={(e) => {
              handleMaxChange(e as ChangeEvent<HTMLInputElement>);
              onChangeInput(e as ChangeEvent<HTMLInputElement>);
            }}
            error={errors.cvv}
            helperText={errors.cvv && t(errorMessages.cvv)}
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
