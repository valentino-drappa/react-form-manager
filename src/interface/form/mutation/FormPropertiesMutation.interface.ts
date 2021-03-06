import { IFormValidator } from '../FormValidatior.interface';
import { IKeyAny } from '../../common/KeyAny.interface';

export interface IFormPropertiesMutation {
  formValidators?: IFormValidator[];
  isFormDisabled?: boolean;
  formClasseNames?: string[];
  formCustomsProps?: IKeyAny;
}
