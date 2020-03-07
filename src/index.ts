import { useFormManager } from './hook/useFormManager';
import { FormInputProperties } from './class/FormInputProperties';
import { IFormAction } from './interface/form/FormAction.interface';
import { IFormInitalState } from './interface/form/FormInitalState.interface';
import { IState } from './interface/form/State.interface';
import { IStateInputs } from './interface/form/StateInptus.interface';
import { IFormValidator } from './interface/form/FormValidatior.interface';
import { IFormInputAvailableValue } from './interface/forminput/FormInputAvailableValue.interface';
import { IFormInputProperties } from './interface/forminput/FormInputProperties.interface';
import { IFormInputValidator } from './interface/forminput/FormInputValidator.interface';
import { IFormInputMutation } from './interface/forminput/mutation/FormInputMutation.interface';
import { IFormInputMutationData } from './interface/forminput/mutation/FormInputMutationData.interface';
import { ICustomProperty } from './interface/common/CustomProperty.interface';
import { IFormPropertiesMutation } from './interface/form/mutation/FormPropertiesMutation.interface';

export {
  useFormManager,
  FormInputProperties as FormInput,
  IFormAction,
  IFormInitalState,
  IState,
  IStateInputs,
  IFormValidator,
  IFormInputAvailableValue,
  IFormInputProperties,
  IFormInputValidator,
  IFormInputMutation,
  IFormInputMutationData,
  ICustomProperty,
  IFormPropertiesMutation,
};
