import { IFormAction } from '../interface/form/FormAction.interface';
import { IState } from '../interface/form/State.interface';
import { EFormActionType } from '../enum/FormActionType.enum';
import { handleInputChange, resetState, setFormProperties } from '../utils/form.utils';
import { addInputs, removeInputs, updateInputs, validateInputs } from '../utils/formInputs.utils';

export const FormReducer = (state: IState, action: IFormAction): IState => {
  switch (action.type) {
    case EFormActionType.INPUT_CHANGE:
      return handleInputChange(action.payload, state);
    case EFormActionType.ADD_INPUTS:
      return addInputs(action.payload, state);
    case EFormActionType.REMOVE_INPUTS:
      return removeInputs(action.payload, state);
    case EFormActionType.UPDATE_INPUTS:
      return updateInputs(action.payload, state, false);
    case EFormActionType.VALIDATE_INPUTS:
      return validateInputs(action.payload, state);
    case EFormActionType.RESET:
      return resetState(action.payload);
    case EFormActionType.SET_FORM_PROPS:
      return setFormProperties(action.payload, state);
    default:
      return state;
  }
};
