import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInput } from './FormInput';
import { ICustomProperty, IStateInputs } from '..';
import { isValidArray } from '../utils/array.utils';
import { validateFormInput } from '../utils/formInputsValidator.utils';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';

export class FormInputBuilder implements IFormInputProperties {
  id?: string;
  name: string;
  value: any = '';
  label: string = '';
  isValid: boolean = true;
  errors: string[] = [];
  disabled: boolean = false;
  classNames: string[] = [];
  validators: IFormInputValidator[] = [];
  availableValues: IFormInputAvailableValue[] = [];
  customProperties: ICustomProperty;
  originalDisabledValue: boolean = false;

  constructor(name: string) {
    this.name = name;
    this.customProperties = {};
  }

  addId(id: string): FormInputBuilder {
    this.id = id;
    return this;
  }

  addValue(value: any): FormInputBuilder {
    this.value = value;
    return this;
  }

  addDisabled(disabled: boolean): FormInputBuilder {
    this.disabled = disabled == null ? false : disabled;
    return this;
  }

  addClassNames(classNames: string[]): FormInputBuilder {
    if (isValidArray(classNames)) {
      this.classNames = classNames;
    }
    return this;
  }

  addValidators(validators: IFormInputValidator[]): FormInputBuilder {
    if (isValidArray(validators)) {
      this.validators = validators.filter((x: IFormInputValidator) => typeof x.validate === 'function');
    }
    return this;
  }

  addAvailableValue({ value, label }: IFormInputAvailableValue): FormInputBuilder {
    return this.addAvailableValueList([{ value, label }]);
  }

  addAvailableValueList(valueList: IFormInputAvailableValue[]): FormInputBuilder {
    if (!isValidArray(valueList)) {
      return this;
    }
    if (!this.availableValues) {
      this.availableValues = [];
    }
    this.availableValues = this.availableValues.concat(valueList);
    return this;
  }

  addLabel(label: any): FormInputBuilder {
    this.label = label;
    return this;
  }

  addProperty(inputPropertiesIn: ICustomProperty) {
    this.customProperties = { ...this.customProperties, ...inputPropertiesIn };
    return this;
  }

  removeProperty(propertyName: any): FormInputBuilder {
    delete this.customProperties[propertyName];
    return this;
  }

  build(): IStateInputs {
    const formInputProperties = new FormInput(this);
    formInputProperties.isValid = validateFormInput(this.value, this.validators).length === 0;
    return { [this.name]: formInputProperties };
  }
}
