import Purchase from '../interfaces/Purchase';

let key = 'purchases';

const getAll = (): Purchase[] => {
  let purchasesStorage = localStorage.getItem(key);
  let purchases = purchasesStorage
    ? (JSON.parse(purchasesStorage) as Purchase[])
    : [];

  return purchases;
};

const add = (data: Purchase) => {
  let purchases = getAll();
  purchases.push(data);

  localStorage.setItem(key, JSON.stringify(purchases));

  return purchases;
};

const module = { add, getAll };

export default module;
