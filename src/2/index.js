const main = () => {
  problem1();
  problem2();
  problem3(8);
};

const problem1 = () => {
  let count = 7;
  for (let i = 0; i < count; i++) {
    console.log("".padStart(i + 1, "#"));
  }
};

const problem2 = () => {
  let count = 100;
  for (let i = 1; i <= count; i++) {
    let output = "";
    if (i % 3 == 0) output += "Fizz";
    if (i % 5 == 0) output += "Buzz";
    console.log(output || i);
  }
};

const problem3 = (size) => {
  let output = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if ((x + y) % 2 == 0) output += " ";
      else output += "#";
    }
    output += "\n";
  }
  console.log(output);
};

export default main;
