import { ChangeEvent, FC } from 'react';
import { Grid, TextField } from '@mui/material';
import CalendarForm from '../../Molecules/CalendarForm';

const errorMessages = {
  firstName: 'You must enter your first name.',
  lastName: 'You must enter your last name.',
  email: 'You must enter a valid email.',
  phone: 'You must enter your phone number.',
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
}
const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
  onChangeInput,
  errors,
  setValue,
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.firstName}
            helperText={errors?.firstName && errorMessages.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.lastName}
            helperText={errors?.lastName && errorMessages.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.email}
            helperText={errors?.email && errorMessages.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            variant="standard"
            onChange={onChangeInput}
            error={errors?.phone}
            helperText={errors?.phone && errorMessages.phone}
          />
        </Grid>
        <CalendarForm setValue={setValue} />
      </Grid>
    </>
  );
};

export default PersonalInformationForm;
