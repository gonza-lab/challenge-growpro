import { ChangeEvent, FC } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const errorMessages = {
  address1: 'bycicle_form.fields.address1.error',
  city: 'bycicle_form.fields.city.error',
  zip: 'bycicle_form.fields.zip.error',
  country: 'bycicle_form.fields.country.error',
};

interface BillingAddressFormProps {
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: {
    address1?: boolean;
    city?: boolean;
    zip?: boolean;
    country?: boolean;
  };
  values: { [name: string]: string | number };
}

const BillingAddressForm: FC<BillingAddressFormProps> = ({
  onChangeInput,
  errors,
  values,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('bycicle_form.steps.billing_address')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label={t('bycicle_form.fields.address1.label')}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={onChangeInput}
            value={values.address1 || ''}
            error={errors?.address1}
            helperText={errors?.address1 && t(errorMessages.address1)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label={t('bycicle_form.fields.address2.label')}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={onChangeInput}
            value={values.address2 || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label={t('bycicle_form.fields.city.label')}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={onChangeInput}
            value={values.city || ''}
            error={errors?.city}
            helperText={errors?.city && t(errorMessages.city)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label={t('bycicle_form.fields.state.label')}
            fullWidth
            variant="standard"
            onChange={onChangeInput}
            value={values.state || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="zip"
            label={t('bycicle_form.fields.zip.label')}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            type="number"
            onChange={onChangeInput}
            value={values.zip || ''}
            error={errors?.zip}
            helperText={errors?.zip && t(errorMessages.zip)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label={t('bycicle_form.fields.country.label')}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={values.country || ''}
            onChange={onChangeInput}
            error={errors?.country}
            helperText={errors?.country && t(errorMessages.country)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BillingAddressForm;
