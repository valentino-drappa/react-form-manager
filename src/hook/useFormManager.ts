import { useReducer, useRef } from 'react';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { IFormInitalState } from '../interface/form/FormInitalState.interface';
import { IState } from '../interface/form/State.interface';
import { FormReducer } from '../reducer/form.reducer';
import { EFormActionType } from '../enum/FormActionType.enum';
import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IFormInputMutation } from '../interface/forminput/mutation/FormInputMutation.interface';
import { resetState } from '../utils/form.utils';
import { IFormPropertiesMutation } from '..';

export const useFormManager = (formInitialStateValues: IFormInitalState) => {
  function init(formInitalState: IFormInitalState): IState {
    return resetState(formInitalState);
  }

  const formInitalValues = useRef(formInitialStateValues);
  const emitLastFieldUpdatedStatus = useRef(true);
  const [state, dispatch] = useReducer(FormReducer, formInitialStateValues, init);

  function getInput(inputName: string): IFormInputProperties {
    /* send a copy to prevent to change input properties  */
    return { ...state.formInputs[inputName] };
  }

  function handleFormChange(e: any) {
    const { name, value, type, tagName, checked } = e.target; // <-- moved outside asynchronous context
    dispatch({
      type: EFormActionType.INPUT_CHANGE,
      payload: { name, value, type, tagName, checked, emitLastFieldUpdatedStatus: emitLastFieldUpdatedStatus.current },
    });
  }

  function getFormValues() {
    const { formInputs } = state;
    return Object.keys(formInputs).reduce(
      (object, inputKey) => ({
        ...object,
        [inputKey]: formInputs[inputKey].value,
      }),
      {},
    );
  }

  function resetForm() {
    emitLastFieldUpdatedStatus.current = true;
    dispatch({
      type: EFormActionType.RESET,
      payload: formInitalValues.current,
    });
  }

  function setFormDisabled(formDisabled: boolean) {
    if (typeof formDisabled !== 'boolean' || formDisabled === state.formProperties.isFormDisabled) {
      return;
    }
    dispatch({ type: EFormActionType.DISABLE_FORM, payload: formDisabled });
  }

  function addInputs(formInputs: IStateInputs) {
    if (!formInputs || !Object.keys(formInputs).length) {
      return;
    }
    dispatch({ type: EFormActionType.ADD_INPUTS, payload: formInputs });
  }

  function updateInputs(formInputMutation: IFormInputMutation) {
    if (!formInputMutation || !Object.keys(formInputMutation).length) {
      return;
    }
    dispatch({ type: EFormActionType.UPDATE_INPUTS, payload: formInputMutation });
  }

  function removeInputs(inputNameList: string[]) {
    if (!inputNameList || !inputNameList.length) {
      return;
    }
    dispatch({ type: EFormActionType.REMOVE_INPUTS, payload: inputNameList });
  }

  // inputNameList: null -> validate all inputs
  function validateInputs(inputNameList?: string[]) {
    dispatch({ type: EFormActionType.VALIDATE_INPUTS, payload: inputNameList });
  }

  function emitLastFieldUpdated(isEmissionEnabled: boolean) {
    emitLastFieldUpdatedStatus.current = isEmissionEnabled;
  }

  function updateFormProps(formProperties: IFormPropertiesMutation) {
    dispatch({ type: EFormActionType.UPDATE_FORM_PROPS, payload: formProperties });
  }

  const { lastFieldUpdated } = state;
  const { formErrors, isFormDisabled, isFormValid } = state.formProperties;
  return {
    handleFormChange,
    getFormValues,
    getInput,
    setFormDisabled,
    addInputs,
    updateInputs,
    removeInputs,
    validateInputs,
    resetForm,
    updateFormProps,
    emitLastFieldUpdated,
    lastFieldUpdated,
    isFormDisabled,
    isFormValid,
    formErrors,
  };
};
