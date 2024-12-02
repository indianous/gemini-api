const chatMessageTableQuery = `CREATE TABLE IF NOT EXISTS Chat (
	id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  create_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS Message(
id TEXT PRIMARY KEY,
role TEXT NOT NULL,
content BLOB NOT NULL,
create_at TEXT NOT NULL,
chat_id TEXT NOT NULL
FOREIGN KEY (chat_id) REFERENCES Chat(id)
)`;

export { chatMessageTableQuery };
