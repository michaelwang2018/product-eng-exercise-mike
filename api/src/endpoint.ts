import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import json from "./data.json";
import groupSummaries from "./groupSummaries.json";

type Feedback = {
  id: number;
  name: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  type: "Sales" | "Customer" | "Research";
  customer: "Loom" | "Ramp" | "Brex" | "Vanta" | "Notion" | "Linear" | "OpenAI";
  date: string;
};

type FeedbackData = Feedback[];

type GroupSummary = {
  id: string;
  title: string;
  body: string;
  feedbackIds: number[];
};

interface FilterState {
  importance: string[];
  type: string[];
  customer: string[];
  date: string | null;
}

export const router = express.Router();
router.use(bodyParser.json());

router.post("/query", queryHandler);
router.post("/groups", groupHandler);

const feedback: FeedbackData = json as FeedbackData;

function queryHandler(req: Request, res: Response<{ data: FeedbackData }>) {
  const { filters } = req.body as { filters: FilterState };

  let filteredFeedback = feedback;

  if (filters.importance && filters.importance.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.importance.includes(item.importance));
  }

  if (filters.type && filters.type.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.type.includes(item.type));
  }

  if (filters.customer && filters.customer.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.customer.includes(item.customer));
  }

  if (filters.date) {
    const filterDate = new Date(filters.date);
    filteredFeedback = filteredFeedback.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === filterDate.toDateString();
    });
  }

  res.status(200).json({ data: filteredFeedback });
}

function groupHandler(
  req: Request,
  res: Response<{ data: GroupSummary[] }>
) {
  const { filters } = req.body as { filters: FilterState };

  let filteredFeedback = feedback;

  if (filters.importance && filters.importance.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.importance.includes(item.importance));
  }

  if (filters.type && filters.type.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.type.includes(item.type));
  }

  if (filters.customer && filters.customer.length > 0) {
    filteredFeedback = filteredFeedback.filter(item => filters.customer.includes(item.customer));
  }

  if (filters.date) {
    const filterDate = new Date(filters.date);
    filteredFeedback = filteredFeedback.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === filterDate.toDateString();
    });
  }

  const filteredGroupSummaries = groupSummaries.filter(group => 
    group.feedbackIds.some(id => filteredFeedback.some(feedback => feedback.id === id))
  );

  res.status(200).json({ data: filteredGroupSummaries });
}
