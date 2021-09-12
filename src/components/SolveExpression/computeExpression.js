const dimension = 100;
let mindp = new Array(dimension);
let maxdp = new Array(dimension);
let minS = new Array(dimension);
let maxS = new Array(dimension);
for (var i = 0; i < dimension; i++) {
  mindp[i] = new Array(dimension);
  maxdp[i] = new Array(dimension);
  minS[i] = new Array(dimension);
  maxS[i] = new Array(dimension);
}
function isOperator(operator) {
  return (
    operator === "+" || operator === "*" || operator === "-" || operator === "/"
  );
}
let numbers = [],
  operators = [];
function compare_float(x, y) {
  if (Math.abs(x - y) < 0.0001) return true;
  return false;
}
function print(i, j, direction) {
  let k, o, s;
  if (i === j) {
    return numbers[i];
  }

  if (direction === 0) {
    s = mindp[i][j];
    k = minS[i][j];
    o = operators[minS[i][j]];
  } else {
    s = maxdp[i][j];
    k = maxS[i][j];
    o = operators[maxS[i][j]];
  }

  let x = mindp[i][k],
    y = mindp[k + 1][j];
  let a = maxdp[i][k],
    b = maxdp[k + 1][j];
  let ans = "";
  if (o === "+") {
    ans += "(";
    if (compare_float(x + y, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 0);
    } else if (compare_float(a + b, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(x + b, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(a + y, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 0);
    }
    ans += ")";
  } else if (o === "-") {
    ans += "(";
    if (compare_float(x - y, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 0);
    } else if (compare_float(a - b, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(x - b, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(a - y, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 0);
    }
    ans += ")";
  } else if (o === "*") {
    ans += "(";
    if (compare_float(x * y, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 0);
    } else if (compare_float(a * b, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(x * b, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(a * y, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 0);
    }
    ans += ")";
  } else if (o === "/") {
    ans += "(";
    if (compare_float(x / y, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 0);
    } else if (compare_float(a / b, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(x / b, s)) {
      ans += print(i, k, 0);
      ans += o;
      ans += print(k + 1, j, 1);
    } else if (compare_float(a / y, s)) {
      ans += print(i, k, 1);
      ans += o;
      ans += print(k + 1, j, 0);
    }
    ans += ")";
  }
  return ans;
}
export default function computeExpression(expression) {
  numbers = [];
  operators = [];
  let temp = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === " ") {
      continue;
    } else if (isOperator(expression[i])) {
      operators.push(expression[i]);
      numbers.push(parseFloat(temp));
      temp = "";
    } else {
      temp += expression[i];
    }
  }
  if (temp !== "") numbers.push(parseFloat(temp));
  if (numbers.length !== operators.length + 1) {
    let stat = false;
    return {
      stat,
      minValue: 0,
      minParenthesization: 0,
      maxValue: 0,
      maxParenthesization: 0,
    };
  }
  let len = numbers.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      mindp[i][j] = 1e52;
      maxdp[i][j] = -1e52;
      maxS[i][j] = 0;
      minS[i][j] = 0;
      if (i === j) mindp[i][j] = maxdp[i][j] = numbers[i];
    }
  }

  for (let L = 2; L <= len; L++) {
    for (let i = 0; i < len - L + 1; i++) {
      let j = i + L - 1;
      for (let k = i; k < j; k++) {
        let mintemp = 0,
          maxtemp = 0;
        let x = mindp[i][k],
          y = mindp[k + 1][j];
        let a = maxdp[i][k],
          b = maxdp[k + 1][j];
        if (operators[k] === "+") {
          maxtemp = Math.max(x + y, Math.max(a + b, Math.max(x + b, a + y)));
          mintemp = Math.min(x + y, Math.min(a + b, Math.min(x + b, a + y)));
        } else if (operators[k] === "*") {
          maxtemp = Math.max(x * y, Math.max(a * b, Math.max(x * b, a * y)));
          mintemp = Math.min(x * y, Math.min(a * b, Math.min(x * b, a * y)));
        } else if (operators[k] === "-") {
          maxtemp = Math.max(x - y, Math.max(a - b, Math.max(x - b, a - y)));
          mintemp = Math.min(x - y, Math.min(a - b, Math.min(x - b, a - y)));
        } else if (operators[k] === "/") {
          maxtemp = Math.max(x / y, Math.max(a / b, Math.max(x / b, a / y)));
          mintemp = Math.min(x / y, Math.min(a / b, Math.min(x / b, a / y)));
        }
        if (mintemp < mindp[i][j]) {
          mindp[i][j] = mintemp;
          minS[i][j] = k;
        }
        if (maxtemp >= maxdp[i][j]) {
          maxdp[i][j] = maxtemp;
          maxS[i][j] = k;
        }
      }
    }
  }
  let minValue = mindp[0][len - 1];
  let minParenthesization = print(0, len - 1, 0);
  let maxValue = maxdp[0][len - 1];
  let maxParenthesization = print(0, len - 1, 1);
  let stat = true;
  return {
    stat,
    minValue,
    minParenthesization,
    maxValue,
    maxParenthesization,
  };
}
