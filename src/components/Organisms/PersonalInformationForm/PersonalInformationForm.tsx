import { ChangeEvent, FC } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import CalendarForm from '../../Molecules/CalendarForm';
import { useTranslation } from 'react-i18next';

const errorMessages = {
  firstName: 'bycicle_form.fields.first_name.error',
  lastName: 'bycicle_form.fields.last_name.error',
  email: 'bycicle_form.fields.email.error',
  phone: 'bycicle_form.fields.phone.error',
};

interface PersonalInformationFormProps {
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
  };
  setValue: any;
  values: { [name: string]: string | number };
  total: number;
  bill: string;
}
const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
  onChangeInput,
  errors,
  setValue,
  values,
  total,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label={t('bycicle_form.fields.first_name.label')}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={onChangeInput}
            value={values.firstName || ''}
            error={errors?.firstName}
            helperText={errors?.firstName && t(errorMessages.firstName)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label={t('bycicle_form.fields.last_name.label')}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onChangeInput}
            value={values.lastName || ''}
            error={errors?.lastName}
            helperText={errors?.lastName && t(errorMessages.lastName)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="email"
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            onChange={onChangeInput}
            value={values.email || ''}
            error={errors?.email}
            helperText={errors?.email && t(errorMessages.email)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="phone"
            name="phone"
            label={t('bycicle_form.fields.phone.label')}
            fullWidth
            autoComplete="tel"
            variant="standard"
            onChange={onChangeInput}
            value={values.phone || ''}
            error={errors?.phone}
            helperText={errors?.phone && t(errorMessages.phone)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {t('bycicle_form.calendar_msg')}
          </Typography>
        </Grid>
        <CalendarForm setValue={setValue} />
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {t('calculated_price')}:{' '}
            {Number.isNaN(total) ? ' ' : t('currency', { val: total })}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformationForm;
