import { IFormValidator } from './FormValidatior.interface';
import { IKeyAny } from '../common/KeyAny.interface';

export interface IStateFormProperties {
  formValidators: IFormValidator[];
  isFormDisabled: boolean;
  isFormTouched: boolean;
  isFormPristine: boolean;
  isFormValid: boolean;
  formErrors: string[];
  formCustomsProps: IKeyAny;
}
