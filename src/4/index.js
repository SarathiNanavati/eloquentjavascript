const main = () => {
  const breaker = "------------------------------------------------";
  console.log(range(1, 10));
  console.log(range(1, 10, 2));
  console.log(range(10, 3, -3));
  console.log(sum(range(1, 10)));
  console.log(sum(range(10, 3, -3)));
  console.log(breaker);
  console.log(reverseArray(["A", "B", "C", "DD"]));
  let testArray = [1, 2, 3, 4, 5, 6];
  reverseArrayInPlace(testArray);
  console.log(testArray);
  console.log(breaker);
  console.log("arrayToList", JSON.stringify(arrayToList([10, 20, 3, 5])));
  console.log("listToArray", listToArray(arrayToList([10, 20, 3, 5])));
  console.log("prepend", prepend(10, prepend(20, prepend(3, null))));
  console.log("nth", nth(arrayToList([10, 20, 3, 5]), 3));
  console.log(breaker);
  let obj = { here: { is: "an" }, object: 2 };
  console.log("deepEqual", deepEqual(null, obj));
  console.log("deepEqual", deepEqual(obj, obj));
  console.log("deepEqual", deepEqual(obj, { here: 1, object: 2, k: "" }));
  console.log("deepEqual", deepEqual(obj, { here: { is: "an" }, object: 2 }));
};

const deepEqual = (object1, object2) => {
  if (object1 === object2) return true;
  if (
    object1 == null ||
    object2 == null ||
    typeof object1 != "object" ||
    typeof object2 != "object"
  )
    return false;

  let keysObj1 = Object.keys(object1),
    keysObj2 = Object.keys(object2);

  if (keysObj1.length != keysObj2.length) return false;

  for (let key of keysObj1) {
    if (!keysObj2.includes(key) || !deepEqual(object1[key], object2[key])) return false;
  }
  return true;
};

const range = (startCount, endCount, step = 1) => {
  let outputArr = [];
  for (let x = startCount; (step > 0 && x <= endCount) || (step < 0 && x >= endCount); x += step)
    outputArr.push(x);
  return outputArr;
};

const sum = (intArr) => intArr.reduce((t, x) => t + x, 0);

const reverseArray = (inputArr) => {
  let outputArr = [];
  for (let x = 0; x < inputArr.length; x++) {
    outputArr.push(inputArr[inputArr.length - 1 - x]);
  }
  return outputArr;
};

const reverseArrayInPlace = (inputArr) => {
  for (let x = 0; x < inputArr.length / 2; x++) {
    const item = inputArr[x];
    inputArr[x] = inputArr[inputArr.length - 1 - x];
    inputArr[inputArr.length - 1 - x] = item;
  }
};

const arrayToList = (inputArr) => {
  if (inputArr.length == 0) return null;
  let list = { value: inputArr[0], rest: arrayToList([...inputArr.slice(1, inputArr.length)]) };
  return list;
};

const listToArray = (list) => {
  const outputArr = [];
  while (list.rest != null) {
    outputArr.push(list.value);
    list = list.rest;
  }
  outputArr.push(list.value);
  return outputArr;
};

const prepend = (item, list = null) => {
  return { value: item, rest: list };
};

const nth = (list, index) => {
  let count = 0;
  while (count < index) {
    list = list.rest;
    count++;
  }
  return list.value;
};

export default main;
