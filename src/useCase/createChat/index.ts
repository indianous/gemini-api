import { ChatRepository } from "@src/repository/chat";
import { generateUUID } from "@src/utils/generatedUUID";

export class CreateChatUseCase {
  constructor(private repository: ChatRepository) {}

  async execute(name: string): Promise<{ id: string }> {
    const id = generateUUID();
    await this.repository.save({ id, name });
    return { id };
  }
}
