import type { Request, Response, NextFunction } from "express";
import * as ticketService from "../services/ticket";
import { TicketSeverity, TicketState, type Ticket } from "../types/ticket";
import { BadRequestError } from "../errors";

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
