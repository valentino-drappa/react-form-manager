import { EFormInputType } from '../../enum/FormInputType.enum';
import { IFormInputValidator } from './FormInputValidator.interface';
import { IFormInputAvailableValue } from './FormInputAvailableValue.interface';

export interface IFormInputData {
    id?: string
    type: EFormInputType
    name: string
    value: any
    label: string
    errors: string[]
    disabled: boolean,
    classNames: string[]
    validators: IFormInputValidator[]
    availableValues: IFormInputAvailableValue[]
    properties: any,
    isValid: boolean
}

