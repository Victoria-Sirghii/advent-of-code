let fs = require("fs");

const input = fs.readFileSync("./day7/input.txt", "utf8").split("\r\n");

const treeData = {};
let i = 0;
let path = [];

while (input[i]) {
  const [first, second, third] = input[i].split(" ");

  if (first === "$") {
    if (second === "cd") {
      switch (third) {
        case "/":
          break;
        case "..":
          path.pop();
          break;
        default:
          path.push(third);
      }
    }
  } else if (first !== "dir") {
    let objTreeData = treeData;

    for (const folder of path) {
      if (!objTreeData[folder]) {
        objTreeData[folder] = {};
      }
      objTreeData = objTreeData[folder];
    }
    objTreeData[second] = Number(first);
  }

  i++;
}

console.log(treeData)

const getFoldersSizes = () => {
  const folderSizes = {};

  const calculateFoldersSize = (treeData, currentPath = ["."]) => {
    let size = 0;

    for (const [key, value] of Object.entries(treeData)) {
      if (typeof value === "object") {
        size += calculateFoldersSize(value, [...currentPath, key]);
      } else {
        size += value;
      }
    }

    folderSizes[currentPath.join("/")] = size;

    return size;
  };

  calculateFoldersSize(treeData);

  return folderSizes;
};

console.log(getFoldersSizes());

function getSumOfFolders() {
  const folderSizes = getFoldersSizes();

  const size = Object.values(folderSizes).reduce((prev, value) => {
    let sum = 0;
    if (value <= 100000) {
      sum += value;
    }

    return prev + sum;
  }, 0);

  return size;
}

function getFolderSize() {
  const folderSizes = getFoldersSizes();

  const space = 30000000 - (70000000 - folderSizes["."]);

  const size = Object.values(folderSizes)
    .filter((size) => size >= space)
    .sort((a, b) => a - b)[0];

  return size;
}

console.log(getSumOfFolders());
console.log(getFolderSize());
