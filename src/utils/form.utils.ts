import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IState } from '../interface/form/State.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { validateForm } from './formValidator.utils';
import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IFormInitalState } from '..';
import { isValidArray } from './array.utils';

export const getFormValidity = (formInputs: IStateInputs, formValidators: IFormValidator[]) => {
  const hasInvalidInputs = Object.keys(formInputs).some(x => !formInputs[x].errors.length);
  const formErrors = hasInvalidInputs ? [] : validateForm(formInputs, formValidators);
  return { formErrors, isFormValid: !hasInvalidInputs && !formErrors.length };
};

export const handleInputChange = ({ name, value, emitLastFieldUpdatedStatus }: any, currentState: IState): IState => {
  const { formInputs } = currentState;
  const formInputData = formInputs[name];
  if (!formInputData) {
    return currentState;
  }

  const currentFormInputData: IFormInputData = formInputs[name];
  const errors = validateFormInput(value, currentFormInputData.validators);
  const formInputDataUpdated = {
    ...currentFormInputData,
    value,
    isValid: errors.length === 0,
    errors,
  };
  const _formInputs = { ...formInputs, [name]: { ...formInputDataUpdated } };
  const { formProperties } = currentState;

  return {
    formInputs: _formInputs,
    formProperties: {
      ...formProperties,
      ...getFormValidity(_formInputs, formProperties.formValidators),
    },
    lastFieldUpdated: emitLastFieldUpdatedStatus ? { inputName: name } : null,
  } as IState;
};

export const setFormDisabled = (isFormDisabled: boolean, state: IState): IState => {
  return { ...state, formProperties: { ...state.formProperties, isFormDisabled } };
};

export const resetState = ({
  formInputs,
  formValidators,
  isFormValid,
  formCustomProperties,
}: IFormInitalState): IState => {
  let _formValidators = [] as IFormValidator[];
  if (formValidators && isValidArray(formValidators)) {
    _formValidators = formValidators.filter((x: IFormValidator) => typeof x.validateForm === 'function');
  }

  return {
    formInputs,
    formProperties: {
      formValidators: _formValidators,
      isFormDisabled: false,
      isFormValid: typeof isFormValid === 'boolean' ? isFormValid : true,
      formErrors: [],
      formCustomProperties,
    },
    lastFieldUpdated: null,
  } as IState;
};
