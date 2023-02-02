import { ChangeEvent, FC, useState, useEffect } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

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
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().startOf('D')
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [numberDays, setNumberDays] = useState(1);

  useEffect(() => {
    const difference = dayjs(endDate).diff(dayjs(startDate), 'day', false) + 1;
    setNumberDays(difference);
    setValue('numberDays', difference);
  }, [startDate, endDate]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Information of Bycicle
      </Typography>
      <Typography>
        <b>Type</b>: Electric
      </Typography>
      <Typography>
        <b>Name</b>: Dangerous
      </Typography>
      <Typography variant="h6" gutterBottom mt={2}>
        Personal Information
      </Typography>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <MobileDatePicker
              label="Start date"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={(newDate) => {
                setStartDate(newDate);
                if (dayjs(newDate).isAfter(endDate)) {
                  setEndDate(newDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  helperText={'Number of days: ' + numberDays}
                />
              )}
              disablePast
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MobileDatePicker
              label="End date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              minDate={startDate || dayjs()}
              onChange={setEndDate}
              renderInput={(params) => <TextField {...params} fullWidth />}
              disablePast
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default PersonalInformationForm;
