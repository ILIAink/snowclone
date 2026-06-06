import express from "express";
import { TicketState } from "./types/ticket";
import { initDb } from "./db/init";
import { createTicketId } from "./services/ticket";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "./controller/ticket";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { ticketRouter } from "./routes/ticket";
const app = express();

app.use(express.json());

app.use("/ticket", ticketRouter);

app.use(errorMiddleware);

app.listen(3000, async () => {
  await initDb();
  console.log("Listening to port 3000");
});
