import { ChangeEvent, FC } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const errorMessages = {
  address1: 'You must enter your address.',
  city: 'You must enter your city.',
  zip: 'You must enter your zip code.',
  country: 'You must enter your country.',
};

interface BillingAddressFormProps {
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: {
    address1?: boolean;
    city?: boolean;
    zip?: boolean;
    country?: boolean;
  };
}

const BillingAddressForm: FC<BillingAddressFormProps> = ({
  onChangeInput,
  errors,
}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Billing address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.address1}
            helperText={errors?.address1 && errorMessages.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={onChangeInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.city}
            helperText={errors?.city && errorMessages.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={onChangeInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            type="number"
            onChange={onChangeInput}
            error={errors?.zip}
            helperText={errors?.zip && errorMessages.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.country}
            helperText={errors?.country && errorMessages.country}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BillingAddressForm;
