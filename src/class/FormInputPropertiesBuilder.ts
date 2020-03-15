import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
import { FormInputProperties } from './FormInputProperties';
import { isValidArray } from '../utils/array.utils';
import { validateFormInput } from '../utils/formInputsValidator.utils';
import { IFormInputProperties } from '../interface/forminput/FormInputProperties.interface';
import { createUpdateId, getInputValidators, getInputAvailableValues } from '../utils/formInputProperties.utils';
import { IStateInputs } from '../interface/form/StateInptus.interface';
import { IKeyAny } from '../interface/common/KeyAny.interface';
import { typeBoolean } from '../constant/FormManager.constant';

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
  customProps: IKeyAny;
  originalDisabledValue: boolean = false;
  updateId: string = '';
  originalValue: any = '';
  isTouched: boolean = false;
  isPristine: boolean = true;

  constructor(name: string) {
    this.name = name;
    this.customProps = {};
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
    this.disabled = typeof disabled !== typeBoolean ? false : disabled;
    return this;
  }

  addClassNames(classNames: string[]): FormInputPropertiesBuilder {
    if (isValidArray(classNames)) {
      this.classNames = classNames;
    }
    return this;
  }

  addValidators(validators: IFormInputValidator[]): FormInputPropertiesBuilder {
    this.validators = getInputValidators(validators);
    return this;
  }

  addAvailableValue({ value, label }: IFormInputAvailableValue): FormInputPropertiesBuilder {
    return this.addAvailableValueList([{ value, label }]);
  }

  addAvailableValueList(valueList: IFormInputAvailableValue[]): FormInputPropertiesBuilder {
    const newValues = getInputAvailableValues(valueList);
    if (!newValues.length) {
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

  addProperty(inputPropertiesIn: IKeyAny) {
    this.customProps = { ...this.customProps, ...inputPropertiesIn };
    return this;
  }

  removeProperty(propertyName: any): FormInputPropertiesBuilder {
    delete this.customProps[propertyName];
    return this;
  }

  build(): IStateInputs {
    const formInputProperties = new FormInputProperties(this);
    formInputProperties.updateId = createUpdateId(this.value);
    formInputProperties.originalValue = this.value;
    formInputProperties.errors = validateFormInput(this.value, this.validators);
    formInputProperties.isValid = formInputProperties.errors.length === 0;
    return { [this.name]: formInputProperties };
  }
}
