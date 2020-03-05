import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputData } from './FormInputData';
import { ICustomProperty } from '..';
import { isValidArray } from '../utils/array.utils';

export class FormInputDataBuilder implements IFormInputData {
  id?: string;
  name: string;
  value: any;
  label: string = '';
  errors: string[] = [];
  disabled: boolean = false;
  classNames: string[] = [];
  validators: IFormInputValidator[] = [];
  availableValues: IFormInputAvailableValue[] = [];
  customProperties: ICustomProperty;

  constructor(name: string) {
    this.name = name;
    this.customProperties = {};
  }

  addId(id: string): FormInputDataBuilder {
    this.id = id;
    return this;
  }

  addValue(value: any): FormInputDataBuilder {
    this.value = value;
    return this;
  }

  addDisabled(disabled: boolean): FormInputDataBuilder {
    this.disabled = disabled == null ? false : disabled;
    return this;
  }

  addClassNames(classNames: string[]): FormInputDataBuilder {
    if (isValidArray(classNames)) {
      this.classNames = classNames;
    }
    return this;
  }

  addValidators(validators: IFormInputValidator[]): FormInputDataBuilder {
    if (isValidArray(validators)) {
      this.validators = validators.filter((x: IFormInputValidator) => typeof x.validate === 'function');
    }
    return this;
  }

  addAvailableValue({ value, label }: IFormInputAvailableValue): FormInputDataBuilder {
    return this.addAvailableValueList([{ value, label }]);
  }

  addAvailableValueList(valueList: IFormInputAvailableValue[]): FormInputDataBuilder {
    if (!isValidArray(valueList)) {
      return this;
    }
    if (!this.availableValues) {
      this.availableValues = [];
    }
    this.availableValues = this.availableValues.concat(valueList);
    return this;
  }

  addLabel(label: any): FormInputDataBuilder {
    this.label = label;
    return this;
  }

  addProperty(inputPropertiesIn: ICustomProperty) {
    this.customProperties = { ...this.customProperties, ...inputPropertiesIn };
    return this;
  }

  removeProperty(propertyName: any): FormInputDataBuilder {
    delete this.customProperties[propertyName];
    return this;
  }

  build(): IStateInputs {
    const formInputData = new FormInputData(this);
    return { [this.name]: formInputData } as IStateInputs;
  }
}
