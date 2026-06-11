import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  getTickets,
  updateTicket,
} from "../controller/ticket";

const ticketRouter = Router();

ticketRouter.get("/", getAllTickets);
ticketRouter.get("/tickets", getTickets);
ticketRouter.post("/id", getTicketById);
ticketRouter.post("/create", createTicket);
ticketRouter.post("/update", updateTicket);

export { ticketRouter };
