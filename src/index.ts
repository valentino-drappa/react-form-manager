import { useFormManager } from './hook/useFormManager';
import { FormInputData } from './class/FormInputData';
import { FormInputDataBuilder } from './class/FormInputDataBuilder';
import { EFormActionType } from './enum/FormActionType.enum';
import { IFormAction } from './interface/form/FormAction.interface';
import { IFormInitalState } from './interface/form/FormInitalState.interface';
import { IState } from './interface/form/State.interface';
import { IStateInputs } from './interface/form/StateInptus.interface';
import { IFormValidator } from './interface/form/FormValidatior.interface';
import { IFormInputAvailableValue } from './interface/forminput/FormInputAvailableValue.interface';
import { IFormInputData } from './interface/forminput/FormInputData.interface';
import { IFormInputValidator } from './interface/forminput/FormInputValidator.interface';
import { IFormInputMutation } from './interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from './interface/forminput/mutation/FormInputMutationData.interface';
import { FormReducer } from './reducer/form.reducer';
import { handleInputChange, setFormDisabled } from './utils/form.utils';
import { getClassNames } from './utils/formInputData.utils';
import { addInputs, updateInputs, removeInputs } from './utils/formInputs.utils';
import { validateFormInput } from './utils/formInputsValidator.utils';
import { ICustomProperty } from './interface/common/CustomProperty.interface';

export {
  useFormManager,
  FormInputData,
  FormInputDataBuilder,
  EFormActionType,
  IFormAction,
  IFormInitalState,
  IState as IFormState,
  IStateInputs as IFormStateInputs,
  IFormValidator,
  IFormInputAvailableValue,
  IFormInputData,
  IFormInputValidator,
  IFormInputMutation,
  IFormInputMutationData,
  FormReducer,
  handleInputChange,
  setFormDisabled,
  getClassNames,
  addInputs,
  updateInputs,
  removeInputs,
  validateFormInput,
  ICustomProperty,
};
