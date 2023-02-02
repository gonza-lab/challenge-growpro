let key = 'purchases';
const savePurchaseInLocalStorage = (data: object) => {
  let purchasesStorage = localStorage.getItem(key);
  let purchases = purchasesStorage
    ? (JSON.parse(purchasesStorage) as Array<object>)
    : [];

  purchases.push(data);

  localStorage.setItem(key, JSON.stringify(purchases));
};

export default savePurchaseInLocalStorage;
