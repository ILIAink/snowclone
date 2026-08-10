import { useQuery } from "@tanstack/react-query";
import {
  ticketService,
  type GetTicketsParams,
} from "../../api/services/tickets";

export const useTickets = (params?: GetTicketsParams) => {
  return useQuery({
    queryKey: ["tickets", params],
    queryFn: () => ticketService.getTickets(params),
  });
};
