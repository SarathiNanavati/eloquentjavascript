const main = () => {
  const breaker = "------------------------------------------------";

  console.log(breaker);

  function parseExpression(program) {
    program = skipSpace(program);
    console.log("parseExpression", program);
    let match, expr;
    if ((match = /^"([^"]*)"/.exec(program))) {
      console.log("parseExpression case 1", match);
      expr = { type: "value", value: match[1] };
    } else if ((match = /^\d+\b/.exec(program))) {
      console.log("parseExpression case 2", match);
      expr = { type: "value", value: Number(match[0]) };
    } else if ((match = /^[^\s(),#"]+/.exec(program))) {
      console.log("parseExpression case 3", match);
      expr = { type: "word", name: match[0] };
    } else {
      throw new SyntaxError("Unexpected syntax: " + program);
    }
    console.log("parseExpression", expr, program, match);
    return parseApply(expr, program.slice(match[0].length));
  }

  function skipSpace(str) {
    let first = str.search(/\S/);
    console.log("skipSpace", first, `"${str.slice(first)}"`);
    if (first == -1) return "";
    return str.slice(first);
  }

  function parseApply(expr, program) {
    program = skipSpace(program);
    console.log("parseApply", expr, program);
    if (program[0] != "(") {
      return { expr: expr, rest: program };
    }

    program = skipSpace(program.slice(1));
    console.log("parseApply", expr, program);
    expr = { type: "apply", operator: expr, args: [] };
    while (program[0] != ")") {
      let arg = parseExpression(program);
      expr.args.push(arg.expr);
      program = skipSpace(arg.rest);
      if (program[0] == ",") {
        program = skipSpace(program.slice(1));
      } else if (program[0] != ")") {
        throw new SyntaxError("Expected ',' or ')'");
      }
    }
    return parseApply(expr, program.slice(1));
  }
  function parse(program) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }
    return expr;
  }

  console.log(parse(" +(a, 10)"));
  // → {type: "apply",
  //    operator: {type: "word", name: "+"},
  //    args: [{type: "word", name: "a"},
  //           {type: "value", value: 10}]}
};

export default main;
