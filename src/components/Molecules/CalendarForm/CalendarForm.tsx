import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { Grid, TextField } from '@mui/material';
import {
  LocalizationProvider,
  MobileDatePicker,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useParams } from 'react-router-dom';

import Purchase from '../../../interfaces/Purchase';

import searchNearVacantDate from '../../../utils/searchNearVacantDate';
import PurchaseLocalStorage from '../../../utils/PurchaseLocalStorage';
import findNearestStartDateFrom from '../../../utils/findNearestStartDate';

import CustomPickerDay from '../../Atoms/CustomPickerDay';

dayjs.extend(isBetween);

interface CalendarFormProps {
  setValue: any;
}

const shouldDisableDate = (
  day: Dayjs,
  bycicleId: number,
  purchases: Purchase[]
): boolean => {
  return !!purchases.find((purchase) => {
    return (
      bycicleId === purchase.bycicleId &&
      dayjs(day).isBetween(
        dayjs(purchase.startDate),
        dayjs(purchase.endDate),
        null,
        '[]'
      )
    );
  });
};

const CalendarForm: FC<CalendarFormProps> = ({ setValue }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().startOf('D')
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(2, 'days'));
  const [numberDays, setNumberDays] = useState(1);
  const [purchases] = useState(PurchaseLocalStorage.getAll());
  const [maxEndDate, setMaxEndDate] = useState<Dayjs | null>();

  console.log(i18n.resolvedLanguage);

  useEffect(() => {
    const difference = dayjs(endDate).diff(dayjs(startDate), 'day', false) + 1;
    setNumberDays(difference);
    setValue('startDate', startDate);
    setValue('endDate', endDate);
    setValue('numberDays', difference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    const vacantDate = searchNearVacantDate(id ? +id : 0, purchases);
    if (vacantDate) {
      setStartDate(vacantDate.startOf('D'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startDate) {
      let nearDate = findNearestStartDateFrom(
        id ? +id : 0,
        purchases,
        startDate.toDate()
      );

      setMaxEndDate(nearDate ? dayjs(nearDate) : null);
      setEndDate(startDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const renderDay = (
    date: Dayjs,
    _: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    const dayIsBetween = date.isBetween(startDate, endDate, null, '[]');

    if (!dayIsBetween) return <PickersDay {...pickersDayProps} />;

    const isFirstDay = date.isSame(startDate, 'day');
    const isLastDay = date.isSame(endDate, 'day');

    return (
      <CustomPickerDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.resolvedLanguage}
    >
      <Grid item xs={12} sm={6}>
        <MobileDatePicker
          label={t('bycicle_form.fields.start_date.label')}
          value={startDate}
          onChange={(newDate) => {
            setStartDate(dayjs(newDate));
            if (dayjs(newDate).isAfter(endDate)) {
              setEndDate(dayjs(newDate));
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              helperText={t('bycicle_form.fields.number_days.label', {
                numberDays,
              })}
            />
          )}
          disablePast
          shouldDisableDate={(day) =>
            shouldDisableDate(day, id ? +id : 0, purchases)
          }
          renderDay={renderDay}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MobileDatePicker
          label={t('bycicle_form.fields.end_date.label')}
          value={endDate}
          minDate={startDate || dayjs()}
          maxDate={maxEndDate || undefined}
          onChange={setEndDate}
          renderDay={renderDay}
          renderInput={(params) => <TextField {...params} fullWidth />}
          disablePast
          shouldDisableDate={(day) =>
            shouldDisableDate(day as Dayjs, id ? +id : 0, purchases)
          }
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default CalendarForm;
