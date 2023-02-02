import dayjs from 'dayjs';
import isSameOAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOAfter);

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
  let total = 0;

  let basePrice = dayjs(startDate).date() >= 15 ? 12 : 10;

  switch (type) {
    case 0:
      total = basePrice * days;
      break;

    case 1:
      total = days <= 3 ? basePrice : basePrice + (days - 3) * basePrice;
      break;

    case 2:
      total = days <= 5 ? basePrice : basePrice + (days - 5) * basePrice;
      break;

    default:
      break;
  }

  return total;
};

export default getByciclePrice;