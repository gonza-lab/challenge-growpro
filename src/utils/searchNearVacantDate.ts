import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Purchase from '../interfaces/Purchase';

dayjs.extend(isBetween);

const searchNearVacantDate = (bycicleId: number, purchases: Purchase[]) => {
  purchases = purchases.filter((purchase) => purchase.bycicleId === bycicleId);
  if (!purchases.length) return dayjs();

  purchases = purchases.sort((a, b) =>
    dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1
  );

  // console.log(purchases);

  let date = dayjs();
  let vacantDate;
  let i = 0;

  while (!vacantDate && i < purchases.length) {
    let isBetween = date.isBetween(
      dayjs(purchases[i].startDate),
      dayjs(purchases[i].endDate),
      'day',
      '[]'
    );

    if (isBetween) {
      // console.log('entre');
      date = dayjs(purchases[i].endDate).add(1, 'day');
      i++;
    } else {
      // console.log('defino');
      vacantDate = date;
    }
  }

  if (i === purchases.length) vacantDate = date;

  return vacantDate;
};

export default searchNearVacantDate;
