import { Database } from "@src/database";
import { Response } from "@src/types/response";

export class ResponseRepository {
  constructor(private database: Database) {
    database.createTables(`CREATE TABLE IF NOT EXISTS Response (
	id TEXT PRIMARY KEY,
  prompt BLOB NOT NULL,
	content BLOB NOT NULL,
  create_at TEXT NOT NULL
);`);
  }

  async save(props: { id: string; prompt: Buffer; content: Buffer }) {
    const { id, prompt, content } = props;
    const now = new Date();
    this.database.insertData(
      "INSERT INTO Response (id, prompt, content, create_at) VALUES (?, ?, ?, ?)",
      [id, prompt, content, now.toISOString()]
    );
  }

  async getAll(): Promise<Response[]> {
    const response = await this.database.getAllData<{
      id: string;
      prompt: Buffer;
      content: Buffer;
      create_at: string;
    }>("SELECT * FROM Response");

    return response.map((item) => ({
      content: item.content.toString(),
      prompt: `[${item.create_at}]: ${item.prompt}`,
    }));
  }

  async getUnique(id: string): Promise<Response> {
    const response = await this.database.getFirstData<{
      id: string;
      prompt: Buffer;
      content: Buffer;
      create_at: string;
    }>("SELECT * FROM Response WHERE id=?", [id]);
    return {
      content: response.content.toString(),
      prompt: response.prompt.toString(),
    };
  }
}
