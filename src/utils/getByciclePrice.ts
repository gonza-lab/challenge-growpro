import dayjs from 'dayjs';
import BASE_PRICES from '../constants/BasePrices';
import BYCICLES from '../constants/Bycicle';
import BONUS_DAYS_BY_TYPE from '../constants/BonusDaysByType';

interface GetByciclePrice {
  days: number;
  type: 0 | 1 | 2;
  startDate: Date;
}

const getByciclePrice = ({
  days,
  startDate,
  type,
}: GetByciclePrice): number => {
  let BASE_PRICE =
    dayjs(startDate).date() >= 15
      ? BASE_PRICES.AFTER_15TH
      : BASE_PRICES.BEFORE_15TH;

  let BONUS_DAYS = BONUS_DAYS_BY_TYPE[BYCICLES[type]];

  let total = ((days <= BONUS_DAYS ? 0 : days - BONUS_DAYS) + 1) * BASE_PRICE;

  return total;
};

export default getByciclePrice;
