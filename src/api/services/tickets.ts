// ticketRouter.get("/tickets", getTickets);
import type { Ticket } from "../../types/backend/ticket";
import { apiClient } from "../client";

export interface GetTicketsParams {
  limit?: number;
  cursor?: Ticket["ticketId"];
  direction?: "next" | "previous";
}

export const ticketService = {
  getTickets: async (params?: GetTicketsParams): Promise<Ticket[]> => {
    const response = await apiClient.get("/ticket/tickets", { params });
    return response.data;
  },
};
