import { MessageRepository } from "@src/repository/message";
import { generateUUID } from "@src/utils/generatedUUID";

export class SaveMessageUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(props: {
    chat: { id: string; message: { role: string; content: string } };
  }): Promise<void> {
    const id = generateUUID();
    const { chat } = props;
    const { message } = chat;
    this.repository.save({
      chat: {
        id: chat.id,
        message: {
          id,
          content: Buffer.from(message.content),
          role: message.role,
        },
      },
    });
  }
}
