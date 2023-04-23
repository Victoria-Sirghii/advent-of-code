const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

function getTotalCalories(calories) {
  const arrayByElf = calories.split("\n\n");
  const totalCaloriesByElf = [];

  for (let i = 0; i < arrayByElf.length; i++) {
    const caloriesArray = arrayByElf[i].split("\n");

    let sumOfCalories = 0;
    for (let j = 0; j < caloriesArray.length; j++) {
      sumOfCalories = sumOfCalories + parseInt(caloriesArray[j].trim(), 10);
    }
    totalCaloriesByElf.push(sumOfCalories);
  }

  const sortedCalories = totalCaloriesByElf.sort((a, b) => b - a);

  return sortedCalories;
}

const topFreeCalories = getTotalCalories(input)
  .slice(0, 3)
  .reduce((a, b) => a + b);

const elfCalories = input
  .split("\n\n")
  .map((elf) => {
    return elf
      .split("\n")
      .reduce((total, current) => total + Number(current.trim()), 0);
  })
  .sort((a, b) => b - a);
