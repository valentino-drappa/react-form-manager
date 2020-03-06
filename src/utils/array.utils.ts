export const isValidArray = (arrayIn: any[]): boolean => {
  // tslint:disable-next-line:triple-equals
  return arrayIn != undefined && Array.isArray(arrayIn) && arrayIn.length > 0;
};
