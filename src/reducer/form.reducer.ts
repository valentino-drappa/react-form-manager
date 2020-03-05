import { IFormAction } from '../interface/form/FormAction.interface';
import { IFormState } from '../interface/form/FormState.interface';
import { EFormActionType } from '../enum/FormActionType.enum';
import { handleInputChange, setFormDisabled } from '../utils/form.utils';
import { addInputs, removeInputs, updateInputs } from '../utils/formInputs.utils';

export const FormReducer = (state: IFormState, action: IFormAction): IFormState => {
  switch (action.type) {
    case EFormActionType.DISABLE_FORM:
      return setFormDisabled(action.payload, state);
    case EFormActionType.INPUT_CHANGE:
      return handleInputChange(action.payload, state);
    case EFormActionType.ADD_INPUTS:
      return addInputs(action.payload, state);
    case EFormActionType.REMOVE_INPUTS:
      return removeInputs(action.payload, state);
    case EFormActionType.UPDATE_INPUTS:
      return updateInputs(action.payload, state);
    case EFormActionType.RESET:
      return { ...action.payload };
    default:
      return state;
  }
};
