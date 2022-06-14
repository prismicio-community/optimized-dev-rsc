/**
 * Concatenates and conditionally omits class names into a single `classNames`
 * prop value.
 */
export const cn = (...classNames) => {
  let result = "";

  for (let i = 0; i < classNames.length; i++) {
    if (classNames[i]) {
      result += " " + classNames[i];
    }
  }

  return result.substring(1);
};
