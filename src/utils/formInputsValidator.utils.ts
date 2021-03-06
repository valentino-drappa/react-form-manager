import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { isValidArray } from './array.utils';

export const validateFormInput = (value: string, models: IFormInputValidator[] | null | undefined): string[] => {
  const errors: string[] = [];
  if (!models || !models.length) {
    return errors;
  }
  models.forEach((x: IFormInputValidator) => {
    const error = x.validate(value);
    if (error) {
      errors.push(error);
    }
  });
  return errors;
};
