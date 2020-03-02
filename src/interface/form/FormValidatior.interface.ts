import { IFormStateInputs } from './FormStateInptus.interface';
export interface IFormValidator {
  validateForm(formInputs: IFormStateInputs): string | null,
};
