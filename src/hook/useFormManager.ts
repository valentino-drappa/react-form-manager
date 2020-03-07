import { useReducer, useRef, useCallback } from 'react';
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

  function getInputProps(inputName: string): IFormInputProperties {
    /* send a copy to prevent to change input properties  */
    return { ...state.formInputs[inputName] };
  }

  const handleFormChange = useCallback((e: any) => {
    const { name, value, type, tagName, checked } = e.target; // <-- moved outside asynchronous context
    dispatch({
      type: EFormActionType.INPUT_CHANGE,
      payload: { name, value, type, tagName, checked, emitLastFieldUpdatedStatus: emitLastFieldUpdatedStatus.current },
    });
  }, []);

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

  const resetForm = useCallback(() => {
    emitLastFieldUpdatedStatus.current = true;
    dispatch({
      type: EFormActionType.RESET,
      payload: formInitalValues.current,
    });
  }, []);

  const addInputs = useCallback((formInputs: IStateInputs) => {
    if (!formInputs || !Object.keys(formInputs).length) {
      return;
    }
    dispatch({ type: EFormActionType.ADD_INPUTS, payload: formInputs });
  }, []);

  const updateInputs = useCallback((formInputMutation: IFormInputMutation) => {
    if (!formInputMutation || !Object.keys(formInputMutation).length) {
      return;
    }
    dispatch({ type: EFormActionType.UPDATE_INPUTS, payload: formInputMutation });
  }, []);

  const removeInputs = useCallback((inputNameList: string[]) => {
    if (!inputNameList || !inputNameList.length) {
      return;
    }
    dispatch({ type: EFormActionType.REMOVE_INPUTS, payload: inputNameList });
  }, []);

  // inputNameList: null -> validate all inputs
  const validateInputs = useCallback((inputNameList?: string[]) => {
    dispatch({ type: EFormActionType.VALIDATE_INPUTS, payload: inputNameList });
  }, []);

  const emitLastFieldUpdated = useCallback((isEmissionEnabled: boolean) => {
    emitLastFieldUpdatedStatus.current = isEmissionEnabled;
  }, []);

  const updateFormProps = useCallback((formProperties: IFormPropertiesMutation) => {
    dispatch({ type: EFormActionType.UPDATE_FORM_PROPS, payload: formProperties });
  }, []);

  const { lastFieldUpdated } = state;
  const { formErrors, isFormDisabled, isFormValid } = state.formProperties;
  return {
    handleFormChange,
    getFormValues,
    getInputProps,
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
