import { IFormValidator } from './FormValidatior.interface';

export interface IStateFormProperties {
  formValidators: IFormValidator[];
  isFormDisabled: boolean;
  isFormValid: boolean;
  formErrors: string[];
  formCustomProps: { [name: string]: any };
}
