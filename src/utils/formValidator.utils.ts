import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IStateInputs } from '../interface/form/StateInptus.interface';

export const validateForm = (formInputsData: IStateInputs, formValidators: IFormValidator[]): string[] => {
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
