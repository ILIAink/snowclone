import type { Request, Response, NextFunction } from "express";
import * as ticketService from "../services/ticket";
import { TicketSeverity, TicketState, type Ticket } from "../types/ticket";
import { BadRequestError } from "../errors";

export const getTickets = async (req: Request, res: Response) => {
  const { limit, cursor, direction } = req.query;

  const parsedLimit = limit ? parseInt(limit as string, 10) : 10;

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    throw new BadRequestError("Limit must be a positive number.");
  }

  const parsedCursor = cursor ? (cursor as Ticket["ticketId"]) : undefined;

  const parsedDirection = direction === "previous" ? "previous" : "next";

  const result = await ticketService.getTickets(
    parsedLimit,
    parsedCursor,
    parsedDirection,
  );

  return res.json(result);
};

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

  const ticketExists = await ticketService.getTicketById(
    ticketPayload.ticketId,
  );

  if (!ticketExists) {
    throw new BadRequestError("Specified ticket does not exist");
  }

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
