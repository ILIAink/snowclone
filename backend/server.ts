import express from "express";
import { TicketState } from "./types/ticket";
import { initDb } from "./db/init";
import { createTicketId } from "./services/ticket";
import { createTicket, updateTicket } from "./controller/ticket";
import { errorMiddleware } from "./middleware/errorMiddleware";
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  return await updateTicket(req, res);
});

app.use(errorMiddleware);

app.listen(3000, async () => {
  await initDb();
  console.log("Listening to port 3000");
});
