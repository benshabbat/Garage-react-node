/** Creates a string validator from a regex. Returns false for non-string or falsy input. */
export const makeRegexValidator = (regex) => (data) => {
  if (!data || typeof data !== "string") return false;
  return regex.test(data);
};
