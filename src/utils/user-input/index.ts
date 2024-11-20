import readline from "readline-sync";

const simpleQuestion = function (question: string): string {
  return readline.question(question);
};

const objetiveQuestion = function (question: string, options: string[]) {
  const index = readline.keyInSelect(options, question);
  return index;
};
export { simpleQuestion, objetiveQuestion };
