import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Purchase from '../interfaces/Purchase';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const searchNearVacantDate = (bycicleId: number, purchases: Purchase[]) => {
  purchases = purchases.filter(
    (purchase) =>
      purchase.bycicleId === bycicleId &&
      dayjs(purchase.endDate).isSameOrAfter(dayjs(), 'day')
  );
  if (!purchases.length) return dayjs();

  purchases = purchases.sort((a, b) =>
    dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1
  );

  let date = dayjs();
  let vacantDate;
  let i = 0;

  while (!vacantDate && i < purchases.length) {
    let isBetween = date.isBetween(
      dayjs(purchases[i].startDate).startOf('D'),
      dayjs(purchases[i].endDate).endOf('D'),
      'day',
      '[]'
    );

    if (isBetween) {
      date = dayjs(purchases[i].endDate).add(1, 'day');
      i++;
    } else {
      vacantDate = date;
    }
  }

  if (i === purchases.length) vacantDate = date;

  return vacantDate;
};

export default searchNearVacantDate;
