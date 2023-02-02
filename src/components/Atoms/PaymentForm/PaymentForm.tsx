import { Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';

const errorMessages = {
  cardName: 'You must enter your name on card.',
  cardNumber: 'You must enter your card number.',
  expDate: 'You must enter expiry date.',
  cvv: 'You must enter your cvv code.',
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

const PaymentForm: FC<PaymentFormProps> = ({ onChangeInput, errors }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardName"
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={onChangeInput}
            error={errors.cardName}
            helperText={errors.cardName && errorMessages.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            id="cardNumber"
            label="Card number"
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
            helperText={errors.cardNumber && errorMessages.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="expDate"
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            inputProps={{ maxLength: 5 }}
            onChange={(e) => {
              handleExpDateChange(e as ChangeEvent<HTMLInputElement>);
              onChangeInput(e as ChangeEvent<HTMLInputElement>);
            }}
            error={errors.expDate}
            helperText={errors.expDate && errorMessages.expDate}
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
            helperText={errors.cvv && errorMessages.cvv}
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
