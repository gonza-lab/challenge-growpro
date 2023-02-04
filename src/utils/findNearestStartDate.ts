import dayjs from 'dayjs';
import Purchase from '../interfaces/Purchase';

const findNearestStartDateFrom = (
  bycicleId: number,
  purchases: Purchase[],
  fromDate: Date
): Date | null => {
  purchases = purchases.filter(
    (purchase) =>
      purchase.bycicleId === bycicleId &&
      dayjs(purchase.startDate).isAfter(fromDate)
  );

  if (!purchases.length) return null;
  let nearest = dayjs(purchases[0].startDate);

  purchases.forEach((purchase) => {
    let diff = dayjs(purchase.startDate).diff(fromDate);
    let nearestDiff = dayjs(nearest).diff(fromDate);

    if (diff < nearestDiff) nearest = dayjs(purchase.startDate);
  });

  return nearest.subtract(1, 'day').toDate();
};

export default findNearestStartDateFrom;
