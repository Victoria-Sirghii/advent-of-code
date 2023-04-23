const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`;

const inputArray = input.split("\n");

function generateAlphabet(capital = false) {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
}

function getLetterPoint(letter) {
  const lowerCaseAlphabet = generateAlphabet();
  const upperCaseAlphabet = generateAlphabet(true);

  const itemsPoints = new Map();

  [...lowerCaseAlphabet, ...upperCaseAlphabet].map((letter, index) =>
    itemsPoints.set(letter, index + 1)
  );

  return itemsPoints.get(letter);
}

function getItemsSum1(input) {
  const totalPoints = input.reduce((sum, currentValue) => {
    const halfOfStr = Math.floor(currentValue.length / 2);

    const firstPart = currentValue.slice(0, halfOfStr).split("");
    const secondPart = currentValue
      .slice(halfOfStr, currentValue.length)
      .split("");

    const sameLetter = firstPart.find((elem) => secondPart.includes(elem));

    return sum + getLetterPoint(sameLetter);
  }, 0);

  return totalPoints;
}

console.log(getItemsSum1(inputArray));

function getItemsSum2(input) {
  const arrayOfArrays = [];

  for (let i = 0; i < input.length; i += 3) {
    arrayOfArrays.push(input.slice(i, i + 3));
  }

  const totalPoints = arrayOfArrays.reduce((sum, currentValue) => {
    const splittedArrays = currentValue.map((item) => item.split(""));

    const sameLetter = splittedArrays[0].find(
      (elem) =>
        splittedArrays[1].includes(elem) && splittedArrays[2].includes(elem)
    );

    return sum + getLetterPoint(sameLetter);
  }, 0);

  return totalPoints;
}

getItemsSum2(inputArray);
