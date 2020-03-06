import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IState } from '../interface/form/State.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { validateForm } from './formValidator.utils';
import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IFormInitalState } from '..';
import { isValidArray } from './array.utils';
import { IFormPropertiesMutation } from '../interface/form/mutation/FormPropertiesMutation.interface';
import { updateFormInputDisabledValue } from './formInputProperties.utils';
import { typeBoolean, typeString, typeCheckbox } from '../constant/FormManager.constant';

const getCheckBoxValue = (checked: boolean, value: any, formInputProps: IFormInputProperties) => {
  const hasMultipleValues = formInputProps.availableValues.length > 0;
  if (!hasMultipleValues) {
    /* on -> default value for checkbox */
    if (value !== '' && value !== 'on') {
      return checked ? value : '';
    }
    return checked;
  }

  const checkBoxValue = formInputProps.value
    .split(',')
    .filter((x: string) => x !== '' && x !== value)
    .map((x: string) => x);

  if (checked) {
    checkBoxValue.push(value);
  }

  return checkBoxValue.length ? checkBoxValue.join(',') : '';
};

const isInvalidFormPropertiesMutation = (formPropertiesMutation: IFormPropertiesMutation) =>
  !formPropertiesMutation.formValidators &&
  typeof formPropertiesMutation.isFormDisabled !== typeBoolean &&
  !formPropertiesMutation.formCustomProperties;

const getFormPropertiesMutation = (formPropertiesMutation: IFormPropertiesMutation) => {
  const { isFormDisabled, formValidators, formCustomProperties } = formPropertiesMutation;
  return {
    mutIsFormDisabled: !!isFormDisabled,
    mutFormValidators: formValidators,
    mutFormCustomProperties: formCustomProperties,
  };
};
const getAuthorizedFormValidators = (formValidators: IFormValidator[]): IFormValidator[] => {
  return isValidArray(formValidators)
    ? formValidators.filter((x: IFormValidator) => typeof x.validateForm === 'function')
    : [];
};

export const getFormValidity = (formInputs: IStateInputs, formValidators: IFormValidator[]) => {
  const hasInvalidInputs = Object.keys(formInputs).some(x => !formInputs[x].isValid);
  const formErrors = hasInvalidInputs ? [] : validateForm(formInputs, formValidators);
  return { formErrors, isFormValid: !hasInvalidInputs && !formErrors.length };
};

export const handleInputChange = (
  { name, value, type, tagName, checked, emitLastFieldUpdatedStatus }: any,
  currentState: IState,
): IState => {
  const { formInputs } = currentState;
  const formInputData = formInputs[name];
  if (!formInputData) {
    return currentState;
  }

  let _inputValue;
  switch (type) {
    case typeCheckbox:
      _inputValue = getCheckBoxValue(checked, value, formInputData);
      break;
    default:
      _inputValue = value;
  }

  const currentFormInputData: IFormInputProperties = formInputs[name];
  const errors = validateFormInput(value, currentFormInputData.validators);
  const formInputDataUpdated = {
    ...currentFormInputData,
    value: _inputValue,
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

export const resetState = ({ formInputs, formValidators, formCustomProperties }: IFormInitalState): IState => {
  const authorizedFormValidators = getAuthorizedFormValidators(formValidators || []);

  const { isFormValid } = getFormValidity(formInputs, authorizedFormValidators);

  return {
    formInputs,
    formProperties: {
      formValidators: authorizedFormValidators,
      isFormDisabled: false,
      isFormValid,
      formErrors: [],
      formCustomProperties,
    },
    lastFieldUpdated: null,
  } as IState;
};

export const updateFormProperties = (formPropertiesMutation: IFormPropertiesMutation, currentState: IState): IState => {
  if (isInvalidFormPropertiesMutation(formPropertiesMutation || {})) {
    return currentState;
  }
  const { mutIsFormDisabled, mutFormValidators, mutFormCustomProperties } = getFormPropertiesMutation(
    formPropertiesMutation,
  );
  const { formInputs, formProperties } = currentState;
  const { isFormDisabled, formValidators, formCustomProperties } = currentState.formProperties;

  let _formValidators = formValidators;
  if (isValidArray(mutFormValidators || [])) {
    _formValidators = getAuthorizedFormValidators(mutFormValidators as IFormValidator[]);
  }

  let _formInputs = formInputs;
  let _isFormDisabled = !!isFormDisabled;
  if (mutIsFormDisabled === !isFormDisabled) {
    _isFormDisabled = mutIsFormDisabled;
    _formInputs = updateFormInputDisabledValue(_formInputs, _isFormDisabled);
  }

  let _formCustomProperties = formCustomProperties;
  if (typeof mutFormCustomProperties === 'object' && Object.keys(mutFormCustomProperties).length) {
    _formCustomProperties = { ...formCustomProperties, ...mutFormCustomProperties };
  }

  return {
    formInputs: _formInputs,
    formProperties: {
      ...formProperties,
      formValidators: _formValidators,
      isFormDisabled: _isFormDisabled,
      formCustomProperties: _formCustomProperties,
      ...getFormValidity(_formInputs, _formValidators),
    },
    lastFieldUpdated: null,
  } as IState;
};
