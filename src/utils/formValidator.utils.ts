import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';

export const validateForm = (formInputsData: IFormStateInputs, formValidators: IFormValidator[]): string[] => {
  const errors: string[] = [];
  if (!formValidators || !formValidators.length) {
    return errors;
  }
  /* prevent to change input properties in the validators */
  const formInputsDataCopy = { ...formInputsData };
  formValidators.forEach((x: IFormValidator) => {
    const error = x.validateForm(formInputsDataCopy);
    if (error) {
      errors.push(error);
    }
  });
  return errors;
};
