import { useQuery } from "@tanstack/react-query";

export type FeedbackData = {
  id: number;
  name: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  type: "Sales" | "Customer" | "Research";
  customer: "Loom" | "Ramp" | "Brex" | "Vanta" | "Notion" | "Linear" | "OpenAI";
  date: string;
}[];

export interface FilterState {
  importance: string[];
  type: string[];
  customer: string[];
  date: string | null;
}

export function useFeedbackQuery(filters: FilterState) {
  return useQuery({
    queryKey: ["feedback", filters],
    queryFn: async () => {
      const response = await fetch("http://localhost:5002/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json() as Promise<{ data: FeedbackData }>;
    },
  });
}

export function useGroupsQuery(query: unknown) {
  return useQuery<{ data: FeedbackGroup[] }>({
    queryFn: async () => {
      const res = await fetch("http://localhost:5001/groups", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        method: "POST",
      });

      return res.json();
    },
    // The query key is used to cache responses and should represent
    // the parameters of the query.
    queryKey: ["groups-data"],
  });
}
