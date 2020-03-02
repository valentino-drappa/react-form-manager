// @flow
import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';

export const validateForm = (formInputModels: IFormStateInputs, formValidators: IFormValidator[]): string[] => {
  const errors: string[] = [];
  if (!formValidators || !formValidators.length) {
    return errors;
  }
  formValidators.forEach((x: IFormValidator) => {
    const error = x.validateForm(formInputModels);
    if (error) {
      errors.push(error);
    }
  });
  return errors;
};
