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

export type GroupSummary = {
  id: string;
  title: string;
  body: string;
  feedbackIds: number[];
};

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

export function useGroupsQuery(filters: FilterState) {
  return useQuery({
    queryKey: ["groups", filters],
    queryFn: async () => {
      const response = await fetch("http://localhost:5002/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json() as Promise<{ data: GroupSummary[] }>;
    },
  });
}

export function useGroupFeedbackQuery(groupId: string | null, filters: FilterState) {
  return useQuery({
    queryKey: ["groupFeedback", groupId, filters],
    queryFn: async () => {
      if (!groupId) return { data: [] };
      const response = await fetch("http://localhost:5002/group-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId, filters }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json() as Promise<{ data: FeedbackData }>;
    },
    enabled: !!groupId,
  });
}
