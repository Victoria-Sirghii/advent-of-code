let fs = require("fs");

let [schema, moves] = fs
  .readFileSync("./day5/input.txt", "utf8")
  .replace(/\r/g, "")
  .split("\n\n");

let inputSchemaLines = schema.split("\n");

const schemaLines = inputSchemaLines.map((item) =>
  [...item].filter((_, index) => index % 4 === 1)
);

schemaLines.pop();

const schemaArrays = new Array(inputSchemaLines.length).fill().map(() => []);

schemaLines.map((line) =>
  line.map((letter, col) => {
    letter !== " " && schemaArrays[col].push(letter);
  })
);

schemaArrays.map((stack) => stack.reverse());

const schemaMoves = moves.split("\n").map((line) => {
  const move = line.split(" ");
  return {
    amount: parseInt(move[1], 10),
    from: parseInt(move[3], 10) - 1,
    to: parseInt(move[5], 10) - 1,
  };
});

function getEnds1(schemaArrays) {
  const newSchema = schemaArrays

  schemaMoves.map(({ amount, from, to }) => {
    for (let i = 0; i < amount; i++) {
      const crate = newSchema[from].pop();
      newSchema[to].push(crate);
    }
  });

  return newSchema.map((stack) => stack[stack.length - 1]).join("");
}

function getEnds2(schemaArrays) {
  let newSchema = schemaArrays;
  
  schemaMoves.map(({ amount, from, to }) => {
    let cratesStack = newSchema[from].splice(-amount, amount);
    newSchema[to].push(...cratesStack);
  });

  return newSchema.map((stack) => stack[stack.length - 1]).join("");
};


console.log("first", getEnds1([...schemaArrays]));
console.log("second", getEnds2([...schemaArrays]));
