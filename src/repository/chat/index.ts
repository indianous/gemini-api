import { Database } from "@src/database";
import { chatMessageTableQuery } from "@src/queries";
import { Chat } from "@src/types/chat";

type ChatDatabase = {
  id: string;
  name: string;
  create_at: string;
};

export class ChatRepository {
  constructor(private database: Database) {
    database.createTables(chatMessageTableQuery);
  }

  async save(props: { id: string; name: string }): Promise<{ id: string }> {
    const { id, name } = props;
    const now = new Date();
    this.database.insertData(
      "INSERT INTO Chat (id, name, create_at) VALUES (?, ?, ?)",
      [id, name, now.toISOString()]
    );
    return { id };
  }

  async getAll(): Promise<Chat[]> {
    const chat = await this.database.getAllData<ChatDatabase>(
      "SELECT * FROM Chat"
    );
  }

  async getUnique(id: string): Promise<Chat> {
    const chat = await this.database.getFirstData<ChatDatabase>(
      "SELECT * FROM Chat WHERE id=?",
      [id]
    );
    return {
      name: chat.name,
      messages: chat.messages.map((item) => ({
        content: item.content.toString(),
        role: item.role,
      })),
    };
  }
}
