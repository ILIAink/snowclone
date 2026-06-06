import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../controller/ticket";

const ticketRouter = Router();

ticketRouter.get("/", getAllTickets);
ticketRouter.post("/id", getTicketById);
ticketRouter.post("/create", createTicket);
ticketRouter.post("/update", updateTicket);

export { ticketRouter };
