import { IFormInputData } from '../forminput/FormInputData.interface';
import { IFormValidator } from '../..';
import { ICustomProperty } from '../common/CustomProperty.interface';

export interface IStateFormProperties {
  formValidators: IFormValidator[];
  isFormDisabled: boolean;
  isFormValid: boolean;
  formErrors: string[];
  formCustomProperties: ICustomProperty;
}
