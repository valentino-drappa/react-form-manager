import { IStateInputs } from './StateInptus.interface';
import { IStateFormProperties } from './StateFormProperties.interface';

export interface IState {
  formInputs: IStateInputs;
  formProperties: IStateFormProperties;
  lastFieldUpdated: { inputName: string } | null;
}
