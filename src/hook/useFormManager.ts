import { useReducer, useRef } from 'react';
import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { IFormInitalState } from '../interface/form/FormInitalState.interface';
import { IFormState } from '../interface/form/FormState.interface';
import { generateFormState } from '../utils/form.utils';
import { FormReducer } from '../reducer/form.reducer';
import { EFormActionType } from '../enum/FormActionType.enum';
import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';
import { IFormInputMutation } from '../interface/forminput/mutation/FormInputMutation.interface';

export default function formManager(formInitialStateValues: IFormInitalState) {
  function init({ formInputs, formValidators }: IFormInitalState): IFormState {
    return generateFormState(formInputs, formValidators, false);
  }

  const emitLastFieldUpdated = useRef(true);
  const [state, dispatch] = useReducer(FormReducer, formInitialStateValues, init);

  function _getInput(inputName: string): IFormInputData {
    return state.formInputs[inputName];
  }

  function _handleFormChange(e: any) {
    const { name, value } = e.target; // <-- moved outside asynchronous context
    dispatch({ type: EFormActionType.INPUT_CHANGE, payload: { name, value } });
  }

  function _getFormValues() {
    const { formInputs } = state;
    return Object.keys(formInputs).reduce(
      (object, inputKey) => ({
        ...object,
        [inputKey]: formInputs[inputKey].value,
      }),
      {},
    );
  }

  return {
    handleFormChange: (e: any) => _handleFormChange(e),
    getFormValues: () => _getFormValues(),
    getInput: (inputName: string) => _getInput(inputName),
    setFormDisabled: (isFormDisabled: boolean) =>
      dispatch({ type: EFormActionType.DISABLE_FORM, payload: isFormDisabled }),
    addInputs: (formInputs: IFormStateInputs) => dispatch({ type: EFormActionType.ADD_INPUTS, payload: formInputs }),
    updateInputs: (formInputMutation: IFormInputMutation) =>
      dispatch({ type: EFormActionType.UPDATE_INPUTS, payload: formInputMutation }),
    removeInputs: (formInputNameList: string[]) =>
      dispatch({ type: EFormActionType.REMOVE_INPUTS, payload: formInputNameList }),
    isFormDisabled: state.isFormDisabled,
    isFormValid: state.isFormValid,
    formErrors: state.formErrors,
    emitLastFieldUpdated: (isLastFieldUpdatedToEmit: boolean) =>
      (emitLastFieldUpdated.current = isLastFieldUpdatedToEmit),
    lastFieldUpdated: emitLastFieldUpdated.current ? state.lastFieldUpdated : null,
  };
}
