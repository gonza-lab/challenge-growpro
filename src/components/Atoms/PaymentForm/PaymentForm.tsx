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
  values: { [name: string]: string | number };
}

const handleExpDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target.value.length === 2) {
    target.value += '-';
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

const PaymentForm: FC<PaymentFormProps> = ({
  onChangeInput,
  errors,
  values,
}) => {
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
            value={values?.cardName || ''}
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
            inputProps={{ minLength: 16, maxLength: 16 }}
            onChange={onChangeInput}
            value={values?.cardNumber || ''}
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
            inputProps={{ maxLength: 5, minLength: 5 }}
            onChange={(e) => {
              handleExpDateChange(e as ChangeEvent<HTMLInputElement>);
              onChangeInput(e as ChangeEvent<HTMLInputElement>);
            }}
            onKeyDown={handleDelete}
            value={values?.expDate || ''}
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
            onChange={onChangeInput}
            value={values?.cvv || ''}
            error={errors.cvv}
            helperText={errors.cvv && t(errorMessages.cvv)}
            inputProps={{ maxLength: 3, minLength: 3 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
