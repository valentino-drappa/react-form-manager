import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputProperties } from './FormInputProperties';
import { ICustomProperty, IStateInputs } from '..';
import { isValidArray } from '../utils/array.utils';
import { validateFormInput } from '../utils/formInputsValidator.utils';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { createUpdateId } from '../utils/formInputProperties.utils';

export class FormInputPropertiesBuilder implements IFormInputProperties {
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
  updateId: string = '';

  constructor(name: string) {
    this.name = name;
    this.customProperties = {};
  }

  addId(id: string): FormInputPropertiesBuilder {
    this.id = id;
    return this;
  }

  addValue(value: any): FormInputPropertiesBuilder {
    this.value = value;
    return this;
  }

  addDisabled(disabled: boolean): FormInputPropertiesBuilder {
    this.disabled = disabled == null ? false : disabled;
    return this;
  }

  addClassNames(classNames: string[]): FormInputPropertiesBuilder {
    if (isValidArray(classNames)) {
      this.classNames = classNames;
    }
    return this;
  }

  addValidators(validators: IFormInputValidator[]): FormInputPropertiesBuilder {
    if (isValidArray(validators)) {
      this.validators = validators.filter((x: IFormInputValidator) => typeof x.validate === 'function');
    }
    return this;
  }

  addAvailableValue({ value, label }: IFormInputAvailableValue): FormInputPropertiesBuilder {
    return this.addAvailableValueList([{ value, label }]);
  }

  addAvailableValueList(valueList: IFormInputAvailableValue[]): FormInputPropertiesBuilder {
    if (!isValidArray(valueList)) {
      return this;
    }
    if (!this.availableValues) {
      this.availableValues = [];
    }
    this.availableValues = this.availableValues.concat(valueList);
    return this;
  }

  addLabel(label: any): FormInputPropertiesBuilder {
    this.label = label;
    return this;
  }

  addProperty(inputPropertiesIn: ICustomProperty) {
    this.customProperties = { ...this.customProperties, ...inputPropertiesIn };
    return this;
  }

  removeProperty(propertyName: any): FormInputPropertiesBuilder {
    delete this.customProperties[propertyName];
    return this;
  }

  build(): IStateInputs {
    const formInputProperties = new FormInputProperties(this);
    formInputProperties.updateId = createUpdateId(this.value);
    formInputProperties.isValid = validateFormInput(this.value, this.validators).length === 0;
    return { [this.name]: formInputProperties };
  }
}
