import { FC } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

import Bycicle from '../../../interfaces/Bycicle';
import BYCICLES from '../../../constants/Bycicle';
import toMoneyFormat from '../../../utils/toMoneyFormat';
import { useTranslation } from 'react-i18next';

interface OrderSummaryProps {
  values: {
    firstName: string;
    email: string;
    lastName: string;
    phone: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    zip: string;
    country: string;
    cardName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
    numberDays: number;
    startDate: Date;
    endDate: Date;
  };
  bycicle: Bycicle;
  total: number;
  bill: string;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  values,
  bycicle,
  total,
  bill,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {t('bycicle_form.steps.review')}
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={bycicle.name}
            secondary={
              t('bycicle.name_with_type.' + BYCICLES[bycicle.type]) +
              '. ' +
              t('number_days', { count: values.numberDays })
            }
          />
          <ListItemText
            primary={toMoneyFormat(total)}
            secondary={bill}
            primaryTypographyProps={{
              variant: 'body2',
              textAlign: 'right',
            }}
            secondaryTypographyProps={{
              textTransform: 'capitalize',
              textAlign: 'right',
            }}
            sx={{ flex: 'unset' }}
          />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {t('currency', { val: total })}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('bycicle_form.steps.billing_address')}
          </Typography>
          <Typography gutterBottom>
            {values.firstName} {values.lastName}
          </Typography>
          <Typography gutterBottom>
            {values.address1}, {values.address2 ? values.address2 + ', ' : ''}
            {values.zip}, {values.city}, {values.state}, {values.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('bycicle_form.steps.payment_details')}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {t('bycicle_form.fields.card_name.label')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {t('bycicle_form.fields.card_number.label')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {t('bycicle_form.fields.exp_date.label')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSummary;
