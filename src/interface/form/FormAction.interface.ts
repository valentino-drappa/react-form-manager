import { EFormActionType } from '../../enum/FormActionType.enum';

export interface IFormAction {
  type: EFormActionType;
  payload: any;
}
