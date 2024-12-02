import { Database } from "@src/database";
import { chatMessageTableQuery } from "@src/queries";

export class MessageRepository {
  constructor(private database: Database) {
    database.createTables(chatMessageTableQuery);
  }

  async save(props: {
    chat: {
      id: string;
      message: { id: string; role: string; content: Buffer };
    };
  }): Promise<void> {
    const { chat } = props;
    const { message } = chat;
    const now = new Date();
    this.database.insertData(
      "INSERT INTO Message (id, role, content, chat_id, create_at) VALUES (?, ?, ?, ?, ?)",
      [message.id, message.role, message.content, chat.id, now.toISOString()]
    );
  }
}
