let fs = require("fs");

let input = fs.readFileSync("./day6/input.txt", "utf8");

function getResult(marker) {
  let index = 0;

  for (let i = 0; i <= input.length; i++) {
    letters = input.slice(i, i + marker);
    const hasSameLetters = letters
      .split("")
      .some((letter, letterIndex) => letters.lastIndexOf(letter) !== letterIndex);

    if (!hasSameLetters) {
      index = i + marker;
      break;
    }
  }
  return index;
}

console.log("first", getResult(4));
console.log("second", getResult(14));
