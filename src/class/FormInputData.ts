import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputDataBuilder } from './FormInputDataBuilder';
import { ICustomProperty } from '../interface/common/CustomProperty.interface';

export class FormInputData implements IFormInputData {
  id?: string;
  name: string;
  value: any;
  label: string;
  isValid: boolean;
  errors: string[];
  disabled: boolean;
  classNames: string[];
  validators: IFormInputValidator[];
  availableValues: IFormInputAvailableValue[];
  customProperties: ICustomProperty;

  constructor(build: IFormInputData) {
    this.id = build.id;
    this.name = build.name;
    this.value = build.value;
    this.label = build.label;
    this.isValid = build.isValid;
    this.errors = [];
    this.disabled = build.disabled;
    this.classNames = build.classNames;
    this.validators = build.validators;
    this.availableValues = build.availableValues;
    this.customProperties = build.customProperties;
  }

  static Builder(name: string) {
    return new FormInputDataBuilder(name);
  }
}
