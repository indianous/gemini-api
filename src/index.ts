import { extractKeyWords } from "./bot/extrat-key-words";
import { save } from "./utils/fs";
import { Response } from "./types/response";
import { simpleQuestion } from "./utils/user-input";
import { getFileName } from "./utils/get-file-name";

async function main() {
  const response = await extractKeyWords(
    simpleQuestion("Texto para extrair as palavras chaves: ")
  );
  return response;
}

console.log("Aplicação funcionando!");
main().then((response: Response) => {
  const fileName = getFileName();
  save(response.prompt + "\n" + response.content, fileName);
  console.log("Bye, bye!");
});
