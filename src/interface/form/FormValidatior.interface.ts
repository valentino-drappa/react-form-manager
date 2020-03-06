import { IStateInputs } from './StateInptus.interface';
export interface IFormValidator {
  validateForm(formInputs: IStateInputs): string | null;
}
