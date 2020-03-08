import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputPropertiesBuilder } from './FormInputPropertiesBuilder';
import { ICustomProperty } from '../interface/common/CustomProperty.interface';

export class FormInputProperties implements IFormInputProperties {
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
  originalDisabledValue: boolean;
  updateId: string;

  constructor(build: IFormInputProperties) {
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
    this.originalDisabledValue = build.disabled;
    this.updateId = build.updateId;
  }

  static Builder(name: string) {
    return new FormInputPropertiesBuilder(name);
  }
}
