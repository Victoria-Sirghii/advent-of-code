const input = `A Y
B X
C Z`;

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

// rock = ["A", "X"];
// paper = ["B", "Y"];
// scissors = ["C", "Z"];

const points = {
  X: 1,
  Y: 2,
  Z: 3,
};

const winningMoves = ["CX", "BZ", "AY"];
const equalMoves = ["AX", "BY", "CZ"];
const losingMoves = ["AZ", "BX", "CY"];

const inputArray = input.split("\n");

function getTotalScore(input) {
  let totalScore = 0;

  for (let i = 0; i < input.length; i++) {
    const roundMove = input[i].split(" ").join("");

    if (winningMoves.includes(roundMove)) {
      totalScore += 6 + points[roundMove[1]];
    } else if (equalMoves.includes(roundMove)) {
      totalScore += 3 + points[roundMove[1]];
    } else {
      totalScore += points[roundMove[1]];
    }
  }
  return totalScore;
}

function getTotalScore2(input) {
  let totalScore = 0;

  for (let i = 0; i < input.length; i++) {
    const roundMove = input[i].split(" ");
    const opponentMove = roundMove[0];
    const myMove = roundMove[1];

    if (myMove === "Z") {
      const winningMove = winningMoves.find((move) => move[0] === opponentMove);
      totalScore += 6 + points[winningMove[1]];
    } else if (myMove === "Y") {
      const equalMove = equalMoves.find((move) => move[0] === opponentMove);
      totalScore += 3 + points[equalMove[1]];
    } else {
      const losingMove = losingMoves.find((move) => move[0] === opponentMove);
      totalScore += points[losingMove[1]];
    }
  }
  return totalScore;
}

console.log("first", getTotalScore(inputArray));
console.log("second", getTotalScore2(inputArray));
