/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method sortArrayByPattern
 * @param {string[]} array
 * @param {string[]} pattern
 * @returns {string[]} sorted array
 * @description sorts an array of strings by a given pattern
 */
export const sortArrayByPattern = ({ array, pattern }: { array: string[]; pattern: string[] }): string[] => {
  return [...array].sort((a, b) => {
    if (pattern.indexOf(a) === pattern.indexOf(b)) {
      return 0;
    } else {
      return pattern.indexOf(a) > pattern.indexOf(b) ? 1 : -1;
    }
  });
};
