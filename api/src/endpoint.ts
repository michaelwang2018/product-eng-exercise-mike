import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import json from "./data.json";

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

type FeedbackGroup = {
  name: string;
  feedback: Feedback[];
};

async function groupHandler(
  req: Request,
  res: Response<{ data: FeedbackGroup[] }>
) {
  const body = req;

  /**
   * TODO(part-2): Implement filtering + grouping
   */

  const pythonRes = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ feedback }),
  });

  const pythonData = (await pythonRes.json()) as { feedback: Feedback[] };

  res.status(200).json({
    data: [
      {
        name: "All feedback",
        feedback: pythonData.feedback,
      },
    ],
  });
}
