/**
 * Concatenates and conditionally omits class names into a single `classNames`
 * prop value.
 *
 * 🐔 "If you've ever heard of or used the `clsx` package, this is that, but
 *     simpler. Simple = good."
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
