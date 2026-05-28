enum Severity {
  low,
  moderate,
  high,
  critical,
}

enum TicketState {
  open = "Open",
  awaitingInfo = "Awaiting Info",
  resolved = "Resolved",
}

type ticket = {
  ticketId: string;
  shortDesc: string;
  description: string;
  state: TicketState;
  severity: Severity;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date;
  assignedTo: null;
};

export { ticket };
