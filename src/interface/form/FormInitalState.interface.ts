import { IFormValidator } from './FormValidatior.interface';
import { IStateInputs } from './StateInptus.interface';
import { IKeyAny } from '../common/KeyAny.interface';

export interface IFormInitalState {
  formInputs: IStateInputs;
  formValidators?: IFormValidator[];
  formCustomsProps?: IKeyAny;
  formClassNames?: string[];
}
