import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { IState } from '../interface/form/State.interface';
import { IFormInputMutation } from '../interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from '../interface/forminput/mutation/FormInputMutationData.interface';
import { getFormValidity, getIsFormTouched, getIsFormPristine } from './form.utils';
import { createUpdateId } from './formInputProperties.utils';

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

const updateFormInputData = (currentFormInput: IFormInputProperties, updatedFormInput: IFormInputMutationData) => {
  const params = updatedFormInput || {};
  const { value, ...restParameters } = params;
  // need to use hasOwnProperty because we can have the property 'validators' to null/undefined
  const validators = params.hasOwnProperty('validators') ? params.validators : currentFormInput.validators;
  let newValue;
  let isTouched;
  if (value === currentFormInput.value) {
    newValue = currentFormInput.value;
    isTouched = currentFormInput.isTouched;
  } else {
    newValue = value;
    isTouched = true;
  }
  const errors = validateFormInput(newValue, validators);
  return {
    ...currentFormInput,
    value: newValue,
    isTouched,
    isPristine: newValue === currentFormInput.originalValue,
    errors,
    isValid: errors.length === 0,
    validators,
    ...restParameters,
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

export const updateInputs = (formInputsToUpdate: IFormInputMutation, currentState: IState): IState => {
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
        ...updateFormInputData(formInputs[inputKey], formInputsToUpdate[inputKey]),
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
  return updateInputs(formInputsMutation, currentState);
};
