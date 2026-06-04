import { db } from "./db";

export const initDb = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      ticketId TEXT PRIMARY KEY,
      shortDesc TEXT NOT NULL,
      description TEXT NOT NULL,
      state TEXT NOT NULL,
      severity INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      resolvedAt TEXT,
      assignedTo JSONB
    )
  `);
};
