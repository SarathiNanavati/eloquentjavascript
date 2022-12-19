const main = () => {
  const breaker = "------------------------------------------------";

  console.log(breaker);
  let arrays = [[1, 2, 3], [4, 5], [6]];
  console.log(arrays.reduce((previous, current) => previous.concat([...current], [])));

  console.log(breaker);
  loop(
    3,
    (n) => n > 0,
    (n) => n - 1,
    console.log
  );
};

const loop = (value, testFn, updateFn, body) => {
  for (let x = value; testFn(x); x = updateFn(x)) {
    body(x);
  }
};

export default main;
