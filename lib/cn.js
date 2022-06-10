export const cn = (...classNames) => {
  let result = "";

  for (let i = 0; i < classNames.length; i++) {
    if (classNames[i]) {
      result += " " + classNames[i];
    }
  }

  return result.substring(1);
};
