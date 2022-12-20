const main = () => {
  const breaker = "------------------------------------------------";
  console.log(new RegExp("eighteen+"));
  console.log(/eighteen\+/);
  console.log("one two 100".match(/\d+/));
  let quotedText = /'([^']*)'/;
  console.log(quotedText.exec("she said 'hello'"));

  console.log(/bad(ly)?/.exec("bad"));
  // → ["bad", undefined]
  console.log(/(\d)+/.exec("123"));
  // → ["123", "3"]

  function getDate(string) {
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    console.log(_);
    return new Date(year, month - 1, day);
  }
  console.log(getDate("1-30-2003"));
  // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

  let name = "dea+hl[]rd";
  let text = "This dea+hl[]rd guy is super annoying.";
  let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");

  let regexp = new RegExp("\\b" + escaped + "\\b", "gi");
  console.log(name, text, escaped, regexp);
  console.log(text.replace(regexp, "_$&_"));

  let pattern = /y/g;
  pattern.lastIndex = 3;
  let match = pattern.exec("xyzzy");
  console.log(pattern, match);
  console.log(match.index);
  console.log(pattern.lastIndex);

  function parseINI(string) {
    // Start with an object to hold the top-level fields
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach((line) => {
      let match;
      if ((match = line.match(/^(\w+)=(.*)$/))) {
        section[match[1]] = match[2];
      } else if ((match = line.match(/^\[(.*)\]$/))) {
        section = result[match[1]] = {};
      } else if (!/^\s*(;.*)?$/.test(line)) {
        throw new Error("Line '" + line + "' is not valid.");
      }
    });
    return result;
  }

  console.log(
    parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
  );

  console.log(breaker);
  // Fill in the regular expressions

  verify(/(cat|car)/, ["my car", "bad cats"], ["camper", "high art"]);

  verify(/pr?op/, ["pop culture", "mad props"], ["plop", "prrrop"]);

  verify(/ferr(et|y|ari)/, ["ferret", "ferry", "ferrari"], ["ferrum", "transfer A"]);

  verify(/ious\b/, ["how delicious", "spacious room"], ["ruinous", "consciousness"]);

  verify(/\s[.,:;]/, ["bad punctuation ."], ["escape the period"]);

  verify(/[\w]{7}/, ["Siebentausenddreihundertzweiundzwanzig"], ["no", "three small words"]);

  verify(/\b[^\We]+\b/i, ["red platypus", "wobbling nest"], ["earth bed", "learning ape", "BEET"]);

  function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes)
      if (!regexp.test(str)) {
        console.log(`Failure to match '${str}'`);
      }
    for (let str of no)
      if (regexp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
      }
  }

  console.log(breaker);
  let text1 = "'I'm the cook,' he said, 'it's my job.'";
  // Change this call.
  console.log(text1.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
  // → "I'm the cook," he said, "it's my job."
  console.log(breaker);

  // Fill in this regular expression.
  let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

  // Tests:
  for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
    if (!number.test(str)) {
      console.log(`Failed to match '${str}'`);
    }
  }
  for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
    if (number.test(str)) {
      console.log(`Incorrectly accepted '${str}'`);
    }
  }
};

export default main;
