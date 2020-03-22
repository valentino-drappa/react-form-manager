import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { IState } from '../interface/form/State.interface';
import { IFormInputMutation } from '../interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from '../interface/forminput/mutation/FormInputMutationData.interface';
import { getFormValidity, getIsFormTouched, getIsFormPristine } from './form.utils';
import { createUpdateId, getInputAvailableValues, getInputValidators } from './formInputProperties.utils';
import { typeBoolean } from '../constant/FormManager.constant';
import { isValidArray } from './array.utils';
import { isValidObject } from './object.utils';

/* Form is disabled, so we need to set his value to the inputs */
const forceDisabledInput = (formInputs: IStateInputs) => {
  Object.keys(formInputs).forEach(x => {
    formInputs[x].originalDisabledValue = formInputs[x].disabled;
    formInputs[x].disabled = true;
  });
};

const createIState = (newFormInputs: IStateInputs, currentState: IState): IState => {
  const { formProperties } = currentState;
  return {
    formInputs: newFormInputs,
    formProperties: {
      ...formProperties,
      isFormTouched: formProperties.isFormTouched ? formProperties.isFormTouched : getIsFormTouched(newFormInputs),
      isFormPristine: getIsFormPristine(newFormInputs),
      ...getFormValidity(newFormInputs, formProperties.formValidators),
    },
    lastFieldUpdated: null,
  } as IState;
};

const isInvalidFormStateInputs = (formStateInputs: IStateInputs | IFormInputMutation) =>
  !formStateInputs || !Object.keys(formStateInputs).length;

const getUpdatedInputProps = (
  currentFormInput: IFormInputProperties,
  updatedFormInput: IFormInputMutationData,
): IFormInputMutationData => {
  const { label, disabled, classNames, validators, availableValues, customProps } = updatedFormInput;
  return {
    disabled: typeof disabled === typeBoolean ? disabled : currentFormInput.disabled,
    classNames: isValidArray(classNames) ? classNames : currentFormInput.classNames,
    validators: isValidArray(validators) ? getInputValidators(validators) : currentFormInput.validators,
    availableValues: isValidArray(availableValues)
      ? getInputAvailableValues(availableValues)
      : currentFormInput.availableValues,
    customProps: isValidObject(customProps) ? customProps : currentFormInput.customProps,
  } as IFormInputMutationData;
};

const updateFormInputData = (
  currentFormInput: IFormInputProperties,
  updatedFormInput: IFormInputMutationData,
  forceInputIsTouched: boolean,
) => {
  const params = updatedFormInput || {};
  const { value } = params;
  let newValue;
  let isTouched;

  // tslint:disable-next-line:triple-equals
  if (value != undefined && value !== currentFormInput.value) {
    newValue = value;
    isTouched = true;
  } else {
    newValue = currentFormInput.value;
    isTouched = forceInputIsTouched === true ? true : currentFormInput.isTouched;
  }
  const updatedInputProps = getUpdatedInputProps(currentFormInput, updatedFormInput);
  const errors = validateFormInput(newValue, updatedInputProps.validators);
  return {
    ...currentFormInput,
    value: newValue,
    isTouched,
    isPristine: newValue === currentFormInput.originalValue,
    errors,
    isValid: errors.length === 0,
    ...updatedInputProps,
    updateId: createUpdateId(newValue),
  };
};

export const addInputs = (formInputsToAdd: IStateInputs, currentState: IState): IState => {
  if (isInvalidFormStateInputs(formInputsToAdd)) {
    return currentState;
  }
  const { formInputs } = currentState;

  /* do not add existing inputs */
  const inputList = Object.keys(formInputsToAdd).filter(x => !formInputs[x]);
  if (!inputList.length) {
    return currentState;
  }

  /* form is disabled */
  if (currentState.formProperties.isFormDisabled === true) {
    forceDisabledInput(formInputsToAdd);
  }

  /* keep order to not overwritte existing inputs */
  const newFormInputs = { ...formInputsToAdd, ...formInputs };
  return createIState(newFormInputs, currentState);
};

export const updateInputs = (
  formInputsToUpdate: IFormInputMutation,
  currentState: IState,
  forceInputIsTouched: boolean,
): IState => {
  if (isInvalidFormStateInputs(formInputsToUpdate)) {
    return currentState;
  }

  const { formInputs } = currentState;

  /* update only existing inputs */
  const inputList = Object.keys(formInputsToUpdate).filter(x => formInputs[x]);

  if (!inputList.length) {
    return currentState;
  }

  const updatedFormInputs = inputList.reduce(
    (object, inputKey) => ({
      ...object,
      [inputKey]: {
        ...updateFormInputData(formInputs[inputKey], formInputsToUpdate[inputKey], forceInputIsTouched),
      },
    }),
    {},
  );

  /* form is disabled */
  if (currentState.formProperties.isFormDisabled === true) {
    forceDisabledInput(updatedFormInputs);
  }

  /* keep order to not overwritte updated inputs */
  const newFormInputs = {
    ...formInputs,
    ...updatedFormInputs,
  };
  return createIState(newFormInputs, currentState);
};

export const removeInputs = (inputNameList: string[], currentState: IState): IState => {
  if (!inputNameList || !inputNameList.length) {
    return currentState;
  }
  const { formInputs } = currentState;
  inputNameList.forEach(formInputName => delete formInputs[formInputName]);
  return createIState({ ...formInputs }, currentState);
};

export const validateInputs = (inputNameList: string[], currentState: IState): IState => {
  const inputsToValidate = inputNameList ? inputNameList : Object.keys(currentState.formInputs);
  if (!inputsToValidate || !inputsToValidate.length) {
    return currentState;
  }
  const { formInputs } = currentState;
  const formInputsMutation = inputsToValidate
    .filter((x: string) => formInputs[x])
    .reduce(
      (object, inputKey) => ({
        ...object,
        [inputKey]: {},
      }),
      {},
    ) as IFormInputMutation;
  // updateInputs will validate the input
  return updateInputs(formInputsMutation, currentState, true);
};
