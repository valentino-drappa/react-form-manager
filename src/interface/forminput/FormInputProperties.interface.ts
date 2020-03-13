import { IFormInputValidator } from './FormInputValidator.interface';
import { IFormInputAvailableValue } from './FormInputAvailableValue.interface';
import { IKeyAny } from '../common/KeyAny.interface';

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
  customProps: IKeyAny;
  originalDisabledValue: boolean;
  updateId: string;
}
