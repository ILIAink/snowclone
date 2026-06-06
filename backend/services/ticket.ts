import type { Ticket } from "../types/ticket";
import { db } from "../db/db";

export const getTicketById = async (ticketId: string) => {
  try {
    const result = await db.query(`SELECT * FROM tickets WHERE ticketId = $1`, [
      ticketId,
    ]);

    if (!result.rows[0]) {
      throw Error("Ticket does not exist");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const createTicketId = async (): Promise<string> => {
  try {
    const result = await db.query(`SELECT COUNT(*) as count FROM tickets`);

    const numOfTickets = Number(result.rows[0].count);
    const nextNum = numOfTickets + 1;

    const digits = Math.max(6, nextNum.toString().length);

    return `CS${nextNum.toString().padStart(digits, "0")}`;
  } catch (error) {
    throw error;
  }
};

export const updateTicket = async (ticket: Ticket) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      UPDATE tickets
      SET shortDesc = $1,
          description = $2,
          state = $3,
          severity = $4,
          createdAt = $5,
          updatedAt = $6,
          resolvedAt = $7,
          assignedTo = $8

      WHERE ticketId = $9
      RETURNING *
      `,
      [
        ticket.shortDesc,
        ticket.description,
        ticket.state,
        ticket.severity,
        ticket.createdAt,
        ticket.updatedAt,
        ticket.resolvedAt,
        ticket.assignedTo,
        ticket.ticketId,
      ],
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const createTicket = async (ticket: Ticket) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      INSERT INTO tickets (
        ticketId,
        shortDesc,
        description,
        state,
        severity,
        createdAt,
        updatedAt,
        resolvedAt,
        assignedTo
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9
      )
      RETURNING *
      `,
      [
        ticket.ticketId,
        ticket.shortDesc,
        ticket.description,
        ticket.state,
        ticket.severity,
        ticket.createdAt,
        ticket.updatedAt,
        ticket.resolvedAt,
        ticket.assignedTo,
      ],
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
