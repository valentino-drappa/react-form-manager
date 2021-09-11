import { IFormInitalState } from '..';
import { typeBoolean, typeCheckbox } from '../constant/FormManager.constant';
import { IKeyAny } from '../interface/common/KeyAny.interface';
import { IFormValidator } from '../interface/form/FormValidatior.interface';
import { IFormPropertiesMutation } from '../interface/form/mutation/FormPropertiesMutation.interface';
import { IState } from '../interface/form/State.interface';
import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { isValidArray } from './array.utils';
import { createUpdateId, updateFormInputDisabledValue } from './formInputProperties.utils';
import { inputValueAreEquals } from './formInputs.utils';
import { validateFormInput } from './formInputsValidator.utils';
import { validateForm } from './formValidator.utils';
import { isValidObject } from './object.utils';

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
  !formPropertiesMutation.formCustomsProps &&
  !isValidArray(formPropertiesMutation.formClasseNames);

const getFormPropertiesMutation = (formPropertiesMutation: IFormPropertiesMutation) => {
  const { isFormDisabled, formValidators, formCustomsProps, formClasseNames } = formPropertiesMutation;
  return {
    mutIsFormDisabled: !!isFormDisabled,
    mutFormValidators: formValidators,
    mutFormCustomsProps: formCustomsProps,
    mutFormClassNames: formClasseNames,
  };
};
const getAuthorizedFormValidators = (formValidators: IFormValidator[]): IFormValidator[] => {
  return isValidArray(formValidators)
    ? formValidators.filter((x: IFormValidator) => typeof x.validateForm === 'function')
    : [];
};

export const getIsFormPristine = (formInputs: IStateInputs) => {
  return Object.keys(formInputs).every(x => formInputs[x].isPristine);
};

export const getIsFormTouched = (formInputs: IStateInputs) => {
  return Object.keys(formInputs).some(x => formInputs[x].isTouched);
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
    isTouched: true,
    isPristine: inputValueAreEquals(_inputValue, currentFormInputData.originalValue),
    errors,
    updateId: createUpdateId(_inputValue),
  };
  const _formInputs = { ...formInputs, [name]: { ...formInputDataUpdated } };
  const { formProperties } = currentState;

  return {
    formInputs: _formInputs,
    formProperties: {
      ...formProperties,
      isFormTouched: true,
      isFormPristine: getIsFormPristine(_formInputs),
      ...getFormValidity(_formInputs, formProperties.formValidators),
    },
    lastFieldUpdated: emitLastFieldUpdatedStatus ? { inputName: name } : null,
  } as IState;
};

export const resetState = ({
  formInputs,
  formValidators,
  formCustomsProps,
  formClassNames,
}: IFormInitalState): IState => {
  const authorizedFormValidators = getAuthorizedFormValidators(formValidators || []);

  const { isFormValid } = getFormValidity(formInputs, authorizedFormValidators);

  return {
    formInputs,
    formProperties: {
      formValidators: authorizedFormValidators,
      isFormDisabled: false,
      isFormValid,
      isFormTouched: false,
      isFormPristine: true,
      formErrors: [],
      formCustomsProps: formCustomsProps || {},
      formClasseNames: isValidArray(formClassNames) ? formClassNames : [],
    },
    lastFieldUpdated: null,
  } as IState;
};

export const setFormProperties = (formPropertiesMutation: IFormPropertiesMutation, currentState: IState): IState => {
  if (isInvalidFormPropertiesMutation(formPropertiesMutation || {})) {
    return currentState;
  }
  const { mutIsFormDisabled, mutFormValidators, mutFormCustomsProps, mutFormClassNames } = getFormPropertiesMutation(
    formPropertiesMutation,
  );
  const { formInputs, formProperties } = currentState;
  const { isFormDisabled, formValidators, formCustomsProps, formClasseNames } = currentState.formProperties;

  let _formValidators = formValidators;
  if (isValidArray(mutFormValidators)) {
    _formValidators = getAuthorizedFormValidators(mutFormValidators as IFormValidator[]);
  }

  let _formClasseNames = formClasseNames;
  if (isValidArray(mutFormClassNames)) {
    _formClasseNames = mutFormClassNames as string[];
  }

  let _formInputs = formInputs;
  let _isFormDisabled = !!isFormDisabled;
  if (mutIsFormDisabled === !isFormDisabled) {
    _isFormDisabled = mutIsFormDisabled;
    _formInputs = updateFormInputDisabledValue(_formInputs, _isFormDisabled);
  }

  let _formCustomsProps = formCustomsProps;
  if (isValidObject(mutFormCustomsProps)) {
    _formCustomsProps = mutFormCustomsProps as IKeyAny;
  }

  return {
    formInputs: _formInputs,
    formProperties: {
      ...formProperties,
      formValidators: _formValidators,
      isFormDisabled: _isFormDisabled,
      formCustomsProps: _formCustomsProps,
      formClasseNames: _formClasseNames,
      ...getFormValidity(_formInputs, _formValidators),
    },
    lastFieldUpdated: null,
  } as IState;
};
