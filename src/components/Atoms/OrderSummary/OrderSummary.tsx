import { FC } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

import Bycicle from '../../../interfaces/Bycicle';
import BYCICLES from '../../../utils/Bycicle';
import toMoneyFormat from '../../../utils/toMoneyFormat';

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
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={bycicle.name}
            secondary={BYCICLES[bycicle.type] + ' Bycicle'}
            secondaryTypographyProps={{
              textTransform: 'capitalize',
            }}
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
            {toMoneyFormat(total)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
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
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card holder</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date</Typography>
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
