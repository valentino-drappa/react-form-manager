import { IFormInputData } from '../interface/forminput/FormInputData.interface';
import { EFormInputType } from '../enum/FormInputType.enum';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormStateInputs } from '../interface/form/FormStateInptus.interface';
import { validateFormInput } from '../utils/formInputsValidator.utils';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputData } from './FormInputData';

export class FormInputDataBuilder implements IFormInputData {
  id?: string;
  type: EFormInputType;
  name: string;
  value: any;
  label: string = '';
  errors: string[] = [];
  disabled: boolean = false;
  classNames: string[] = [];
  validators: IFormInputValidator[] = [];
  availableValues: IFormInputAvailableValue[] = [];
  properties: any;
  isValid: boolean = false;

  constructor(type: EFormInputType, name: string) {
    this.type = type;
    this.name = name;
    this.properties = {};
    this.isValid = true;
  }

  getDefaultValue(type: EFormInputType, value: any): any {
    switch (type) {
      case EFormInputType.INPUT_TYPE_CHECKBOX:
        return value == null || typeof value !== 'boolean' ? false : value;
      default:
        return value == null ? false : value;
    }
  }

  isValidArray(arrayIn: any[]): boolean {
    return arrayIn && Array.isArray(arrayIn) && arrayIn.length > 0;
  }

  addId(id: string): FormInputDataBuilder {
    this.id = id;
    return this;
  }

  addValue(value: any): FormInputDataBuilder {
    this.value = this.getDefaultValue(this.type, value);
    return this;
  }

  addDisabled(disabled: boolean): FormInputDataBuilder {
    this.disabled = disabled == null ? false : disabled;
    return this;
  }

  addClassNames(classNames: string[]): FormInputDataBuilder {
    if (this.isValidArray(classNames)) {
      this.classNames = classNames;
    }
    return this;
  }

  addValidators(validators: [IFormInputValidator]): FormInputDataBuilder {
    if (
      this.isValidArray(validators) &&
      (this.type === EFormInputType.INPUT_TYPE_TEXT ||
        this.type === EFormInputType.INPUT_TYPE_EMAIL ||
        this.type === EFormInputType.INPUT_TYPE_PASSWORD)
    ) {
      this.validators = validators.filter((x: IFormInputValidator) => typeof x.validate === 'function');
    }
    return this;
  }

  addAvailableValue(value: any, label: any): FormInputDataBuilder {
    return this.addAvailableValueList([{ value, label }]);
  }

  addAvailableValueList(valueList: [any]): FormInputDataBuilder {
    if (!this.isValidArray(valueList)) {
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

  addProperty(propertyName: any, propertyValue: any) {
    this.properties = { ...this.properties, [propertyName]: propertyValue };
    return this;
  }

  removeProperty(propertyName: any): FormInputDataBuilder {
    delete this.properties[propertyName];
    return this;
  }

  private getDefaultFormInputValue = (inputType: EFormInputType, currentValue: any): string | boolean => {
    /*
      let value == null
      [*] return true if model.value === null || model.value === undefined
  */
    if (
      inputType === EFormInputType.INPUT_TYPE_CHECKBOX &&
      (currentValue == null || currentValue !== false || currentValue !== true)
    ) {
      return false;
    }
    return currentValue || '';
  };

  build(): IFormStateInputs {
    const formInputData = new FormInputData(this);
    formInputData.value = this.getDefaultFormInputValue(formInputData.type, formInputData.value);
    formInputData.errors = validateFormInput(formInputData.value, formInputData.validators);
    formInputData.isValid = !formInputData.errors.length;
    return { [this.name]: formInputData } as IFormStateInputs;
  }
}
