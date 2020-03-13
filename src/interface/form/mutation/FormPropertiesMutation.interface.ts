import { IFormValidator } from '../FormValidatior.interface';
import { ICustomProperty } from '../../common/CustomProperty.interface';

export interface IFormPropertiesMutation {
  formValidators?: IFormValidator[];
  isFormDisabled?: boolean;
  formCustomProperties?: ICustomProperty;
}
