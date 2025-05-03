export const isAnyBlank = (words: string[]): boolean => {
  words.forEach((word) => {
    if (word.trim().length === 0) {
      return true;
    }
  });
  return false;
};
