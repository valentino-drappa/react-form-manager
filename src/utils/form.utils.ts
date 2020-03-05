import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';
import { IFormState } from '../interface/form/FormState.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { EFormInputType } from '../enum/FormInputType.enum';
import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { validateForm } from './formValidator.utils';
import { IFormValidator } from '../interface/form/FormValidatior.interface';

const isFormWithValidInputs = (formInputs: IFormStateInputs): boolean => {
  return !Object.keys(formInputs).some(x => !formInputs[x].isValid);
};

export const isInvalidForm = (formInputs: IFormStateInputs, formErrors: string[]): boolean => {
  return !isFormWithValidInputs(formInputs) || formErrors.length > 0;
};

export const generateFormState = (
  formInputs: IFormStateInputs,
  formValidators: IFormValidator[],
  isFormDisabled: boolean,
  updatedInputName: string | null,
): IFormState => {
  const formErrors = validateForm(formInputs, formValidators);
  return {
    formInputs,
    formValidators,
    formErrors,
    isFormDisabled,
    isFormValid: !isInvalidForm(formInputs, formErrors),
    lastFieldUpdated: { inputName: updatedInputName },
  };
};

export const handleInputChange = ({ name, value }: any, state: IFormState): IFormState => {
  const { formInputs, formValidators } = state;
  const formInputData = formInputs[name];
  if (!formInputData) {
    return state;
  }

  const currentFormInputData: IFormInputData = formInputs[name];
  const errors = validateFormInput(value, currentFormInputData.validators);
  const formInputDataUpdated = {
    ...currentFormInputData,
    value: currentFormInputData.type === EFormInputType.INPUT_TYPE_CHECKBOX ? !currentFormInputData.value : value,
    errors,
    isValid: errors.length === 0,
  };
  const _formInputs = { ...formInputs, [name]: { ...formInputDataUpdated } };
  return generateFormState(_formInputs, formValidators, state.isFormDisabled, name);
};

export const setFormDisabled = (isFormDisabled: boolean, state: IFormState): IFormState => {
  if (isFormDisabled === state.isFormDisabled) {
    return state;
  }
  return { ...state, isFormDisabled };
};
