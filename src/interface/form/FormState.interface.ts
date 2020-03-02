import { IFormStateInputs } from "./FormStateInptus.interface";
import { IFormValidator } from "./FormValidatior.interface";

export interface IFormState {
  formInputs: IFormStateInputs
  formValidators: IFormValidator[]
  isFormDisabled: boolean,
  isFormValid: boolean,
  formErrors: string[],
  lastFieldUpdated?: string,
}
