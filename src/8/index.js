const main = () => {
  const breaker = "------------------------------------------------";

  class MultiplicatorUnitFailure extends Error {}
  function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
      return a * b;
    } else {
      throw new MultiplicatorUnitFailure("Klunk");
    }
  }

  function reliableMultiply(a, b) {
    let errorFlag = true;
    while (errorFlag) {
      try {
        const result = primitiveMultiply(a, b);
        errorFlag = false;
        return result;
      } catch (error) {
        if (error instanceof MultiplicatorUnitFailure) {
        } else throw error;
      }
    }
  }

  console.log(reliableMultiply(8, 8));
  console.log(breaker);

  const box = {
    locked: true,
    unlock() {
      this.locked = false;
    },
    lock() {
      this.locked = true;
    },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    },
  };

  function withBoxUnlocked(body) {
    try {
      box.unlock();
      body();
      box.lock();
    } catch (error) {
      console.log("Trying to access locked box");
    }
  }
  console.log(box);
  withBoxUnlocked(function () {
    box.content.push("gold piece");
  });
  console.log(box);

  try {
    withBoxUnlocked(function () {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  console.log(box.locked);
  // → true
};

export default main;
