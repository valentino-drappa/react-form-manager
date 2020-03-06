import { IStateInputs } from '../interface/form/StateInptus.interface';
import { isValidArray } from './array.utils';
export const getClassNames = (classNames: string[]): string =>
  isValidArray(classNames || []) ? classNames.join(' ') : '';

export const updateFormInputDisabledValue = (formInputs: IStateInputs, disableInput: boolean): IStateInputs => {
  return Object.keys(formInputs).reduce(
    (object, inputKey) => ({
      ...object,
      [inputKey]: {
        ...formInputs[inputKey],
        originalDisabledValue: !!formInputs[inputKey].disabled,
        disabled: !!disableInput ? disableInput : formInputs[inputKey].originalDisabledValue,
      },
    }),
    {},
  );
};
