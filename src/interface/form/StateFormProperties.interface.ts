import { ICustomProperty } from '../common/CustomProperty.interface';
import { IFormValidator } from './FormValidatior.interface';

export interface IStateFormProperties {
  formValidators: IFormValidator[];
  isFormDisabled: boolean;
  isFormValid: boolean;
  formErrors: string[];
  formCustomProperties: ICustomProperty;
}
