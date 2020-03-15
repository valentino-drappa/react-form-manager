import { IStateInputs } from '../interface/form/StateInptus.interface';
import { isValidArray } from './array.utils';
import { IFormInputValidator } from '../interface/forminput/FormInputValidator.interface';
import { IFormInputAvailableValue } from '../interface/forminput/FormInputAvailableValue.interface';
export const getClassNames = (classNames: string[]): string => (isValidArray(classNames) ? classNames.join(' ') : '');

export const updateFormInputDisabledValue = (formInputs: IStateInputs, disableInput: boolean): IStateInputs => {
  return Object.keys(formInputs).reduce(
    (object, inputKey) => ({
      ...object,
      [inputKey]: {
        ...formInputs[inputKey],
        originalDisabledValue: !!formInputs[inputKey].disabled,
        disabled: !!disableInput ? disableInput : formInputs[inputKey].originalDisabledValue,
        updateId: createUpdateId(formInputs[inputKey].value),
      },
    }),
    {},
  );
};

export const createUpdateId = (value: any) => `${value}${Math.random()}`;

export const getInputValidators = (validators: IFormInputValidator[] | null | undefined) => {
  if (isValidArray(validators)) {
    return (validators as IFormInputValidator[]).filter((x: IFormInputValidator) => typeof x.validate === 'function');
  }
  return [];
};

export const getInputAvailableValues = (availableValues: IFormInputAvailableValue[] | null | undefined) => {
  if (isValidArray(availableValues)) {
    return (availableValues as IFormInputAvailableValue[]).filter(
      // tslint:disable-next-line:triple-equals
      (x: IFormInputAvailableValue) => x.label != undefined && x.value != undefined,
    );
  }
  return [];
};
