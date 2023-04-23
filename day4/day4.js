const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const inputArray = input.split("\n");

function getPairs(getSum) {
  const splittedValues = inputArray.map((pair) => pair.split(","));

  const totalPairs = splittedValues.reduce((sum, currentValue) => {
    const firstPair = getArraysOfNumbers(currentValue[0]);
    const secondPair = getArraysOfNumbers(currentValue[1]);

    if (firstPair.length < secondPair.length) {
      sum = getSum(firstPair, secondPair, sum);
    } else {
      sum = getSum(secondPair, firstPair, sum);
    }

    return sum;
  }, 0);

  return totalPairs;
}

function getArraysOfNumbers(pair) {
  const arrayOfNumbers = pair.split("-").map((number) => parseInt(number, 10));
  const totalNumbers = arrayOfNumbers[1] - arrayOfNumbers[0];

  return [...Array(totalNumbers + 1)].map((_, i) => i + arrayOfNumbers[0]);
}

function getSum1(firstPair, secondPair, sum) {
  const isContained = firstPair.every((item) => secondPair.includes(item));

  return isContained ? sum + 1 : sum;
}

function getSum2(firstPair, secondPair, sum) {
  const isContained = firstPair.some((item) => secondPair.includes(item));

  return isContained ? sum + 1 : sum;
}

console.log(getPairs(getSum1));
console.log(getPairs(getSum2));
