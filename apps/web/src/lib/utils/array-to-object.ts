/**
 * Converts an array of strings to an object where each string becomes a key
 * @param array - Array of strings to convert
 * @returns Object with the strings as keys
 */
export function arrayToObject(array: string[]): Record<string, true> {
  return array.reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {} as Record<string, true>,
  );
}
