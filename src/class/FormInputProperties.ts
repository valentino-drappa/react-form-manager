import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputPropertiesBuilder } from './FormInputPropertiesBuilder';
import { IKeyAny } from '../interface/common/KeyAny.interface';

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
  customProps: IKeyAny;
  originalDisabledValue: boolean;
  updateId: string;
  originalValue: any;
  isTouched: boolean;
  isPristine: boolean;

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
    this.customProps = build.customProps;
    this.originalDisabledValue = build.disabled;
    this.updateId = build.updateId;
    this.originalValue = build.originalValue;
    this.isTouched = build.isTouched;
    this.isPristine = build.isPristine;
  }

  static Builder(name: string) {
    return new FormInputPropertiesBuilder(name);
  }
}
