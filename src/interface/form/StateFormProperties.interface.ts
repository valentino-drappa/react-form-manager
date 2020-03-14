import { IFormValidator } from './FormValidatior.interface';
import { IKeyAny } from '../common/KeyAny.interface';

export interface IStateFormProperties {
  isFormDisabled: boolean;
  isFormTouched: boolean;
  isFormPristine: boolean;
  isFormValid: boolean;
  formErrors: string[];
  formValidators: IFormValidator[];
  formClasseNames: string[];
  formCustomsProps: IKeyAny;
}
