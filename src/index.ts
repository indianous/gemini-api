import { simpleQuestion } from "./utils/user-input";
import { Database } from "./database";
import { ChatRepository } from "./repository/chat";
import { CreateChatUseCase } from "./useCase/createChat";
import { MessageRepository } from "./repository/message";
import { SaveMessageUseCase } from "./useCase/saveMessage";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("Aplicação funcionando!");
  // criar chat
  const database = new Database();
  const chatRepository = new ChatRepository(database);
  const createChat = new CreateChatUseCase(chatRepository);
  const { id: chatId } = await createChat.execute(
    simpleQuestion("Qual é o nome do chat? ")
  );
  const messageRepository = new MessageRepository(database);
  const saveMessage = new SaveMessageUseCase(messageRepository);
  let exit = "";
  do {
    // enviar mensagem
    const youcontent = simpleQuestion("Você: ");
    saveMessage.execute({
      chat: { id: chatId, message: { role: "you", content: youcontent } },
    });

    // receber mensagem
    const botcontent = faker.lorem.paragraph();
    console.log("Bot: ", botcontent);
    saveMessage.execute({
      chat: { id: chatId, message: { role: "you", content: botcontent } },
    });
    exit = simpleQuestion("Sair? (S/N) ");
  } while (exit != "S");
}

main().then();
