import { IFormValidator, ICustomProperty } from '../../..';

export interface IFormPropertiesMutation {
  formValidators?: IFormValidator[];
  isFormDisabled?: boolean;
  formCustomProperties?: ICustomProperty;
}
