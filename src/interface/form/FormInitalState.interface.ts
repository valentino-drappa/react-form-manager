import { IFormValidator } from './FormValidatior.interface';
import { IStateInputs } from './StateInptus.interface';
import { ICustomProperty } from '../..';
export interface IFormInitalState {
  formInputs: IStateInputs;
  formValidators?: IFormValidator[];
  isFormValid?: boolean;
  formCustomProperties?: ICustomProperty;
}
