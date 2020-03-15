export const isValidObject = (objectIn: object | undefined | null): boolean => {
  return (
    // tslint:disable-next-line: triple-equals
    objectIn != undefined &&
    typeof objectIn === 'object' &&
    !Array.isArray(objectIn) &&
    (Object.keys(objectIn).length > 0 || objectIn === {})
  );
};
