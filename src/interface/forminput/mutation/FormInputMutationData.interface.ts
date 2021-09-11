import { IKeyAny } from '../../common/KeyAny.interface';
import { IFormInputAvailableValue } from '../FormInputAvailableValue.interface';
import { IFormInputValidator } from '../FormInputValidator.interface';

export interface IFormInputMutationData {
  value?: any;
  label?: string;
  disabled?: boolean;
  classNames?: string[];
  validators?: IFormInputValidator[];
  availableValues?: IFormInputAvailableValue[];
  customProps?: IKeyAny;
  resetIsPristine?: boolean;
}
