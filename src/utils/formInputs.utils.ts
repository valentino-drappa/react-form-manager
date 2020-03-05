import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';
import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { validateFormInput } from './formInputsValidator.utils';
import { IFormState } from '../interface/form/FormState.interface';
import { generateFormState } from './form.utils';
import { IFormInputMutation } from '../interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from '../interface/forminput/mutation/FormInputMutationData.interface';

const isInvalidFormStateInputs = (formStateInputs: IFormStateInputs | IFormInputMutation) =>
  !formStateInputs || !Object.keys(formStateInputs).length;

const updateFormInputData = (currentFormInput: IFormInputData, updatedFormInput: IFormInputMutationData) => {
  const params = updatedFormInput || {};
  const { value, ...restParameters } = params;
  // need to use hasOwnProperty because we can have the property 'validators' to null/undefined
  const validators = params.hasOwnProperty('validators') ? params.validators : currentFormInput.validators;
  const newValue = value == null ? currentFormInput.value : value;
  const errors = validateFormInput(newValue, validators);
  return {
    ...currentFormInput,
    value: newValue,
    errors,
    isValid: errors.length === 0,
    validators,
    ...restParameters,
  };
};

export const addInputs = (formInputsToAdd: IFormStateInputs, currentState: IFormState): IFormState => {
  if (isInvalidFormStateInputs(formInputsToAdd)) {
    return currentState;
  }
  const { formInputs, formValidators, isFormDisabled } = currentState;

  /* do not add existing inputs */
  const inputList = Object.keys(formInputsToAdd).filter(x => !formInputs[x]);
  if (!inputList.length) {
    return currentState;
  }

  /* keep order to not overwritte existing inputs */
  const newFormInputs = { ...formInputsToAdd, ...formInputs };
  return generateFormState(newFormInputs, formValidators, isFormDisabled, null);
};

export const updateInputs = (formInputsToUpdate: IFormInputMutation, currentState: IFormState): IFormState => {
  if (isInvalidFormStateInputs(formInputsToUpdate)) {
    return currentState;
  }
  const { formInputs, formValidators, isFormDisabled } = currentState;

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

  /* keep order to not overwritte updated inputs */
  const newFormInputs = { ...formInputs, ...updatedFormInputs };
  return generateFormState(newFormInputs, formValidators, isFormDisabled, null);
};

export const removeInputs = (formNameList: string[], currentState: IFormState): IFormState => {
  if (!formNameList || !formNameList.length) {
    return currentState;
  }
  const { formInputs, formValidators, isFormDisabled, lastFieldUpdated } = currentState;

  formNameList.forEach(formInputName => delete formInputs[formInputName]);
  return generateFormState({ ...formInputs }, formValidators, isFormDisabled, null);
};
