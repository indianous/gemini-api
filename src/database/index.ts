import sqlite from "sqlite3";
import { env } from "../utils/env";

class Database {
  private db;
  constructor() {
    this.db = new sqlite.Database(env.DATABASE_FILENAME);
  }

  async createTables(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async insertData(
    sql: string,
    params: (string | Buffer)[] = []
  ): Promise<void> {
    if (params && params.length > 0) {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    }
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async updateData(sql: string, params: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async deleteData(sql: string, identifier: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, [identifier, false], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async getAllData<T>(sql: string, params: string[] = []): Promise<T[]> {
    if (params && params.length > 0) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          const data = rows as T[];
          resolve(data);
        });
      });
    }
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) reject(err);
        const data = rows as T[];
        resolve(data);
      });
    });
  }

  async getFirstData<T>(sql: string, params: string[] = []): Promise<T> {
    if (params && params.length > 0) {
      return new Promise((resolve, reject) => {
        this.db.get(sql, params, (err, row) => {
          if (err) reject(err);
          const data = row as T;
          resolve(data);
        });
      });
    }
    return new Promise((resolve, reject) => {
      this.db.get(sql, (err, row) => {
        if (err) reject(err);
        const data = row as T;
        resolve(data);
      });
    });
  }

  close() {
    this.db.close();
  }
}
const database = new Database();

export { database, Database };
