import { useState } from "react";
import { useTickets } from "../hooks/queries/ticket";
import { TicketSeverity } from "../types/backend/ticket";

export default function TicketTable({ params }: { params?: any }) {
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState<{
    cursor?: string;
    direction?: "next" | "previous";
  }>({});
  const { data, isLoading, isError, isFetching } = useTickets({
    ...params,
    ...cursor,
  });

  const tickets = data?.tickets || [];

  const goNext = () => {
    if (!isFetching && data?.nextCursor) {
      setCursor({ cursor: data.nextCursor, direction: "next" });
      setPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (!isFetching && page > 1) {
      setCursor(
        page === 2 ? {} : { cursor: data?.prevCursor, direction: "previous" },
      );
      setPage((p) => p - 1);
    }
  };

  if (isError)
    return <div className="text-red-500 p-4">Failed to load tickets.</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            {[
              "ID",
              "Description",
              "State",
              "Severity",
              "Assignee",
              "Created",
            ].map((h) => (
              <th key={h} className="px-6 py-3 font-medium text-gray-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={`divide-y divide-gray-200 ${isFetching ? "opacity-50" : ""}`}
        >
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : tickets.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map((t: any) => (
              <tr key={t.ticketid} className="hover:bg-gray-50">
                <td className="px-6 py-4">{t.ticketid}</td>
                <td className="px-6 py-4 truncate max-w-xs">{t.shortdesc}</td>
                <td className="px-6 py-4">{t.state}</td>
                <td className="px-6 py-4 capitalize">
                  {TicketSeverity[t.severity].toLowerCase()}
                </td>
                <td className="px-6 py-4">
                  {t.assignedto?.name || "Unassigned"}
                </td>
                <td className="px-6 py-4">
                  {new Date(t.createdat).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
        <button
          onClick={goPrev}
          disabled={page === 1 || isFetching}
          className="px-4 py-2 bg-white border rounded text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={goNext}
          disabled={tickets.length < 10 || isFetching}
          className="px-4 py-2 bg-white border rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
