export const isValidArray = (arrayIn: any[] | undefined | null): boolean => {
  // tslint:disable-next-line:triple-equals
  return arrayIn != undefined && Array.isArray(arrayIn);
};
