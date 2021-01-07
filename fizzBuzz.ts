export function transferNumber(number: number, rules: Array<Function>) {
  for (let i = 0; i < rules.length; i++) {
    const res = rules[i](number);
    if (typeof res === 'string') {
      return res;
    }
  }

  return number;
}

export function ruleA(number: number) {
  if (number % 3 === 0) {
    return true;
  }

  return false;
}

export function ruleB(number: number) {
  if (number % 5 === 0) {
    return true;
  }

  return false;
}

export function transferA(number: number) {
  if (ruleA(number) && ruleB(number)) {
    return 'FizzBuzz';
  }

  return number;
}

export function transferB(number: number) {
  if (ruleA(number)) {
    return 'Fizz';
  }

  return number;
}

export function transferC(number: number) {
  if (ruleB(number)) {
    return 'Buzz';
  }

  return number;
}

export default function fizzBuzz(range: Array<number>) {
  const outBuffer = [];
  for (let i = range[0]; i <= range[1]; i++) {
    outBuffer.push(transferNumber(i, [transferA, transferB, transferC]));
  }

  return outBuffer.join('');
}

// export default function fizzBuzz() {
//   const outBuffer = [];
//   for (let i = 1; i <= 100; i++) {
//     if (i % 3 == 0 && i % 5 == 0) {
//       outBuffer.push('FizzBuzz');
//     } else if (i % 3 === 0) {
//       outBuffer.push('Fizz');
//     } else if (i % 5 === 0) {
//       outBuffer.push('Buzz');
//     } else {
//       outBuffer.push(i);
//     }
//   }

//   console.log(outBuffer.join(''));
// }
