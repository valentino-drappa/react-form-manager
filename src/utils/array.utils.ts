export const isValidArray = (arrayIn: any[] | undefined): boolean => {
  return arrayIn !== undefined && Array.isArray(arrayIn) && arrayIn.length > 0;
};
