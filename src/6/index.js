const main = () => {
  const breaker = "------------------------------------------------";

  console.log(breaker);
  console.log(new Vec(2, 3));
  console.log(new Vec(3, 4).plus(new Vec(4, 5)));
  console.log(new Vec(3, 41).length);
  console.log(breaker);

  Array.prototype.myMap = function (callback) {
    let returnArr = [];
    for (let index = 0; index < this.length; index++) {
      returnArr.push(callback(this[index], index, this));
    }
    return returnArr;
  };

  console.log([1, 3, 4, 5, 6, 6].myMap((n, i) => n * i));
  console.log(breaker);
  let group = Group.from([10, 20, 40, 20, 30, 10, 40, 30]);
  console.log(group.has(10));
  console.log(group.has(50));
  group.add(10);
  group.delete(10);
  console.log(group.has(10));
  console.log(breaker);
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  console.log(breaker);
  let map = { one: true, two: true, hasOwnProperty: true };

  console.log(Object.prototype.hasOwnProperty.call(map, "one"));
  console.log(breaker);
  console.log(breaker);
};

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position > this.group.members.length - 1) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position], done: false };
      this.position++;
      return result;
    }
  }
}

class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.members.includes(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter((item) => item != value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

export default main;
