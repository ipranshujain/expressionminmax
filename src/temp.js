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
let num = [],
  opr = [];
function compare_float(x, y) {
  if (Math.abs(x - y) < 0.0001) return true;
  return false;
}
function print(i, j, direction) {
  let k, o, s;
  if (i === j) {
    return num[i];
  }

  if (direction === 0) {
    s = mindp[i][j];
    k = minS[i][j];
    o = opr[minS[i][j]];
  } else {
    s = maxdp[i][j];
    k = maxS[i][j];
    o = opr[maxS[i][j]];
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
    // cout<<" S is: "<<s<<endl;
    // cout<<"k is: "<<k<<" i is: "<<i<<" j is: "<<j<<endl;
    // cout<<"x is: "<<x<<" y is: "<<y<<" a is: "<<a<<" b is: "<<b<<endl;
    // cout<<"x/y is: "<<x*y<<" a/b is: "<<a*b<<" x/b is: "<<x*b<<" a/y is: "<<a*y<<endl;
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
function computeExpression(expression) {
  num = [];
  opr = [];
  let tmp = "";
  //  store operator and numbers in different vectors
  for (let i = 0; i < expression.length; i++) {
    if (isOperator(expression[i])) {
      opr.push(expression[i]);
      num.push(parseInt(tmp));
      tmp = "";
    } else {
      tmp += expression[i];
    }
  }
  //  storing last number in vector
  num.push(parseInt(tmp));

  let len = num.length;

  //  initializing minval and maxval 2D array
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      mindp[i][j] = 1e9;
      maxdp[i][j] = -1e9;
      maxS[i][j] = 0;
      minS[i][j] = 0;
      if (i === j) mindp[i][j] = maxdp[i][j] = num[i];
    }
  }

  for (let L = 2; L <= len; L++) {
    for (let i = 0; i < len - L + 1; i++) {
      let j = i + L - 1;
      for (let k = i; k < j; k++) {
        let minTmp = 0,
          maxTmp = 0;
        let x = mindp[i][k],
          y = mindp[k + 1][j];
        let a = maxdp[i][k],
          b = maxdp[k + 1][j];
        if (opr[k] === "+") {
          maxTmp = Math.max(x + y, Math.max(a + b, Math.max(x + b, a + y)));
          minTmp = Math.min(x + y, Math.min(a + b, Math.min(x + b, a + y)));
        } else if (opr[k] === "*") {
          maxTmp = Math.max(x * y, Math.max(a * b, Math.max(x * b, a * y)));
          minTmp = Math.min(x * y, Math.min(a * b, Math.min(x * b, a * y)));
        } else if (opr[k] === "-") {
          maxTmp = Math.max(x - y, Math.max(a - b, Math.max(x - b, a - y)));
          minTmp = Math.min(x - y, Math.min(a - b, Math.min(x - b, a - y)));
        } else if (opr[k] === "/") {
          maxTmp = Math.max(x / y, Math.max(a / b, Math.max(x / b, a / y)));
          minTmp = Math.min(x / y, Math.min(a / b, Math.min(x / b, a / y)));
        }
        if (minTmp < mindp[i][j]) {
          mindp[i][j] = minTmp;
          minS[i][j] = k;
        }
        if (maxTmp >= maxdp[i][j]) {
          maxdp[i][j] = maxTmp;
          maxS[i][j] = k;
        }
      }
    }
  }
  //computation part end
  //starting of display part
  let minValue = mindp[0][len - 1];
  let minParenthesization = print(0, len - 1, 0);
  let maxValue = maxdp[0][len - 1];
  let maxParenthesization = print(0, len - 1, 1);
  // cout<<"\nMinimum number of multiplication: "<<mindp[0][len-1]<<"\n";
  // cout<<"MIN PARENTHESIZATION IS: \n";
  // print(0,len-1,0);
  // cout<<"\nMaximum number of multiplication: "<<maxdp[0][len-1]<<"\n";
  // cout<<"MAX PARENTHESIZATION IS: \n";
  // print(0,len-1,1);
  return { minValue, minParenthesization, maxValue, maxParenthesization };
}
console.log(computeExpression("1-2/3+4*5"));
