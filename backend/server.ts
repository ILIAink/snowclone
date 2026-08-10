import express from "express";
import { TicketState } from "./types/ticket";
import { initDb } from "./db/init";
import cors from "cors";

import { errorMiddleware } from "./middleware/errorMiddleware";
import { ticketRouter } from "./routes/ticket";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/ticket", ticketRouter);

// Error Handler
app.use(errorMiddleware);

app.listen(3000, async () => {
  await initDb();
  console.log("Listening to port 3000");
});
