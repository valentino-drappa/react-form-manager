import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { EFormInputType } from '../enum/FormInputType.enum';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputDataBuilder } from './FormInputDataBuilder';

export class FormInputData implements IFormInputData {
  id?: string;
  type: EFormInputType;
  name: string;
  value: any;
  label: string;
  errors: string[];
  disabled: boolean;
  classNames: string[];
  validators: IFormInputValidator[];
  availableValues: IFormInputAvailableValue[];
  properties: any;
  isValid: boolean;

  constructor(build: IFormInputData) {
    this.id = build.id;
    this.type = build.type;
    this.name = build.name;
    this.value = build.value;
    this.label = build.label;
    this.errors = [];
    this.disabled = build.disabled;
    this.classNames = build.classNames;
    this.validators = build.validators;
    this.availableValues = build.availableValues;
    this.properties = build.properties;
    this.isValid = build.isValid;
  }

  static Builder(type: EFormInputType, name: string) {
    return new FormInputDataBuilder(type, name);
  }
}
