export const getClassNames = (classNames: string[] | undefined | null): string =>
  classNames ? classNames.join(' ') : '';
