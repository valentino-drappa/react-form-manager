import { useFormManager } from './hook/useFormManager';
import { FormInputData } from './class/FormInputData';
import { FormInputDataBuilder } from './class/FormInputDataBuilder';
import { EFormActionType } from './enum/FormActionType.enum';
import { EFormInputType } from './enum/FormInputType.enum';
import { IFormAction } from './interface/form/FormAction.interface';
import { IFormInitalState } from './interface/form/FormInitalState.interface';
import { IFormState } from './interface/form/FormState.interface';
import { IFormStateInputs } from './interface/form/FormStateInptus.interface';
import { IFormValidator } from './interface/form/FormValidatior.interface';
import { IFormInputAvailableValue } from './interface/forminput/FormInputAvailableValue.interface';
import { IFormInputData } from './interface/forminput/FormInputData.interface';
import { IFormInputValidator } from './interface/forminput/FormInputValidator.interface';
import { IFormInputMutation } from './interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from './interface/forminput/mutation/FormInputMutationData.interface';
import { FormReducer } from './reducer/form.reducer';
import { isInvalidForm, generateFormState, handleInputChange, setFormDisabled } from './utils/form.utils';
import { getClassNames } from './utils/formInputData.utils';
import { addInputs, updateInputs, removeInputs } from './utils/formInputs.utils';
import { validateFormInput } from './utils/formInputsValidator.utils';

export {
  useFormManager,
  FormInputData,
  FormInputDataBuilder,
  EFormActionType,
  EFormInputType,
  IFormAction,
  IFormInitalState,
  IFormState,
  IFormStateInputs,
  IFormValidator,
  IFormInputAvailableValue,
  IFormInputData,
  IFormInputValidator,
  IFormInputMutation,
  IFormInputMutationData,
  FormReducer,
  isInvalidForm,
  generateFormState,
  handleInputChange,
  setFormDisabled,
  getClassNames,
  addInputs,
  updateInputs,
  removeInputs,
  validateFormInput,
};
