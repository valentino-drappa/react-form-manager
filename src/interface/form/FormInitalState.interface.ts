import { IFormValidator } from './FormValidatior.interface';
import { IFormStateInputs } from './FormStateInptus.interface';
export interface IFormInitalState {
  formInputs: IFormStateInputs,
  formValidators: IFormValidator[],
}
