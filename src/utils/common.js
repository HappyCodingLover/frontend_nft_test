export const randomRange = (lg) => {
  const results = [];
  const possibleValues = Array.from({ length: lg }, (value, i) => i);

  for (let i = 0; i < lg; i += 1) {
    const possibleValuesRange = lg - (lg - possibleValues.length);
    const randomNumber = Math.floor(Math.random() * possibleValuesRange);
    const normalizedRandomNumber =
      randomNumber !== possibleValuesRange ? randomNumber : possibleValuesRange;

    const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1);

    results.push(nextNumber);
  }

  return results;
};
