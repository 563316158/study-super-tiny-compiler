export enum TokenTypes {
  Paren,
  Name,
  Number,
}

interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  const nameReg = /[a-zA-Z]/;
  const numberReg = /\d/;
  let current = 0;

  const length = code.length;
  let lastCharType;
  while (current < length) {
    let char = code[current];
    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
    }

    if (nameReg.test(char)) {
      if (lastCharType !== TokenTypes.Name) {
        tokens.push({
          type: TokenTypes.Name,
          value: char,
        });
      } else {
        const token = tokens[tokens.length - 1];
        token.value = token.value + char;
      }
      lastCharType = TokenTypes.Name;
    }

    if (numberReg.test(char)) {
      if (lastCharType !== TokenTypes.Number) {
        tokens.push({
          type: TokenTypes.Number,
          value: char,
        });
      } else {
        const token = tokens[tokens.length - 1];
        token.value = token.value + char;
      }
      lastCharType = TokenTypes.Number;
    }

    if(char === " "){
      lastCharType = null;
    }

    current++;
  }

  return tokens;
}
