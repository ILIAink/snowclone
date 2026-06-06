import type { Request, Response, NextFunction } from "express";
import * as ticketService from "../services/ticket";
import { TicketSeverity, TicketState, type Ticket } from "../types/ticket";
import { BadRequestError } from "../errors";

export const getAllTickets = async (req: Request, res: Response) => {
  const tickets = await ticketService.getAllTickets();

  if (tickets.length === 0) {
    throw new BadRequestError("There are no tickets to return!");
  }

  return res.json(tickets);
};

export const getTicketById = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new BadRequestError("Request body is missing");
  }

  const { ticketId } = req.body;

  if (!ticketId) {
    throw new BadRequestError("A ticketId is required");
  }

  const ticket = await ticketService.getTicketById(ticketId);

  if (!ticket) {
    throw new BadRequestError("The specified ticket does not exist.");
  }

  return res.json(ticket);
};

export const updateTicket = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new BadRequestError("Request body is missing");
  }

  const ticketPayload: Ticket = req.body;

  const updatedTicket = await ticketService.updateTicket(ticketPayload);

  return res.json(updatedTicket);
};

export const createTicket = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new BadRequestError("Request body is missing");
  }

  const { shortDesc, description, severity } = req.body;

  if (!shortDesc || !description || !severity) {
    throw new BadRequestError(
      "Required fields: Short Description, Description, and Severity",
    );
  }

  const newTicket: Ticket = await ticketService.createTicket({
    ticketId: await ticketService.createTicketId(),
    shortDesc: shortDesc,
    description: description,
    state: TicketState.new,
    severity: severity,
    createdAt: new Date(),
    updatedAt: new Date(),
    resolvedAt: null,
    assignedTo: null,
  });

  return res.json(newTicket);
};
