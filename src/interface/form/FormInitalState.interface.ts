import { IFormValidator } from './FormValidatior.interface';
import { IStateInputs } from './StateInptus.interface';
import { ICustomProperty } from '../common/CustomProperty.interface';
export interface IFormInitalState {
  formInputs: IStateInputs;
  formValidators?: IFormValidator[];
  formCustomProperties?: ICustomProperty;
}
