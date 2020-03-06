import { IFormInputValidator } from './FormInputValidator.interface';
import { IFormInputAvailableValue } from './FormInputAvailableValue.interface';
import { ICustomProperty } from '../common/CustomProperty.interface';

export interface IFormInputProperties {
  id?: string;
  name: string;
  value: any;
  label: string;
  isValid: boolean;
  errors: string[];
  disabled: boolean;
  classNames: string[];
  validators: IFormInputValidator[];
  availableValues: IFormInputAvailableValue[];
  customProperties: ICustomProperty;
  originalDisabledValue: boolean;
}
