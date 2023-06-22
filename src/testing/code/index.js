//----------------------------------------------- Polyfill -----------------------------------------------

// let name = {
//   firstame: "Akshay",
//   lastname: "Saini",
// };

// let printFullName = function (message, state) {
//   console.log(`${this.firstame} ${this.lastname} : ${message} from ${state}`);
// };

// printFullName.call(name, "Hi");

// let printMyName = printFullName.bind(name);
// printMyName("JSK", "Surat-Gujarat");

// Function.prototype.myBind = function (...args) {
//   console.log("Arguments", ...args);
//   let func = this,
//     params = args.slice(1);
//   return function (...args2) {
//     console.log("Arguments", params, args2);
//     func.apply(args[0], [...params, ...args2]);
//   };
// };

// let printMyName2 = printFullName.myBind(name, "Jai Shree Ram");
// printMyName2("Surat => Gujarat");

//----------------------------------------------- Function Currying -----------------------------------------------
// Using Bind Method

// let multiply = function (x, y) {
//   console.log(x * y);
// };

// let multiplyByTwo = multiply.bind(this, 2, 3);
// multiplyByTwo(6);
// let multiplyByThree = multiply.bind(this, 3);
// multiplyByThree(8);

// Using Function Clouser

// let multiply = function (factor) {
//   return function (by) {
//     console.log(factor * by);
//   };
// };

// let multiplyByTwo = multiply(2);
// multiplyByTwo(4);

function* generatorFn() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}

const gen = generatorFn();

gen
  .next()
  .value.then(() => console.log("fulfilled"))
  .catch((e) => console.warn(e));
