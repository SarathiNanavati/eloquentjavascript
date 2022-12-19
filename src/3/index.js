const main = () => {
  console.log(problem1(3, 5));
  console.log(isEven(-2));
  console.log(countBs("BBSBBSBSB"));
  console.log(countChar("abcaabcababc", "abc"));
};

const problem1 = (a, b) => (a > b ? b : a);

const isEven = (x) => {
  if (x < 0) return isEven(-x);
  else if (x === 0) return true;
  else if (x === 1) return false;
  else return isEven(x - 2);
};

// const countBs = (str) => {
//   let count = 0;
//   for (let i = 0; i < str.length; i++) {
//     count += str[i] == "B" ? 1 : 0;
//   }
//   return count;
// };
const countBs = (str) => {
  return countChar(str, "B");
};

const countChar = (str, searchStr) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.slice(i, i + searchStr.length) == searchStr) {
      count += 1;
    }
  }
  return count;
};

export default main;
