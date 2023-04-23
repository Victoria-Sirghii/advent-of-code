let fs = require("fs");

const input = fs
  .readFileSync("./day8/input.txt", "utf8")
  .split("\r\n")
  .map((str) => str.split("").map(Number));

function getTreeLines(grid, rowIndex, colIndex) {
  const top = [];
  const bottom = [];
  const right = [];
  const left = [];

  // top
  for (let i = rowIndex; i > 0; i--) {
    top.push(grid[i - 1][colIndex]);
  }

  // bottom
  for (let i = rowIndex; i < grid.length - 1; i++) {
    bottom.push(grid[i + 1][colIndex]);
  }

  // right
  for (let i = colIndex; i < grid[rowIndex].length - 1; i++) {
    right.push(grid[rowIndex][i + 1]);
  }

  // left
  for (let i = colIndex; i > 0; i--) {
    left.push(grid[rowIndex][i - 1]);
  }

  return [top, bottom, right, left];
}

function getAllVisibleTrees(input) {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const actualTree = input[i][j];
      const treesLines = getTreeLines(input, i, j);

      const isVisible = treesLines.some((line) =>
        line.every((tree) => tree < actualTree)
      );

      if (isVisible) {
        sum++;
      }
    }
  }

  return sum;
}

function getHighestTree(input) {
  let highestScore = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const actualTree = input[i][j];
      const treesLines = getTreeLines(input, i, j);

      const score = treesLines.reduce((a, treesLine) => {
        let counter = 0;

        for (let tree of treesLine) {
          counter++;
          if (tree >= actualTree) {
            return a * counter;
          }
        }

        return a * counter;
      }, 1);

      if (score > highestScore) {
        highestScore = score;
      }
    }
  }

  return highestScore;
}
