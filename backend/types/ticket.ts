export enum TicketState {
  new = "New",
  open = "Open",
  awaitingInfo = "Awaiting Info",
  resolved = "Resolved",
}

type Engineer = {
  name: string;
  email: string;
};

export enum TicketSeverity {
  low,
  moderate,
  high,
  critical,
}

type Ticket = {
  ticketId: string;
  shortDesc: string;
  description: string;
  state: TicketState;
  severity: TicketSeverity;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  assignedTo: Engineer | null;
};

export type { Ticket };
