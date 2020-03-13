import { IFormInputValidator } from '../FormInputValidator.interface';
import { IFormInputAvailableValue } from '../FormInputAvailableValue.interface';
import { IKeyAny } from '../../common/KeyAny.interface';

export interface IFormInputMutationData {
  value?: any;
  label?: string;
  disabled?: boolean;
  classNames?: string[];
  validators?: IFormInputValidator[];
  availableValues?: IFormInputAvailableValue[];
  customProps?: IKeyAny;
}
