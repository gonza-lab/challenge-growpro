let swap = (i1: number, i2: number, arr: any[]) => {
  let copy = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = copy;

  return arr;
};

export default swap;
