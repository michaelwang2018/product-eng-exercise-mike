import fs from 'fs';
import path from 'path';
import json from './data.json';
import OpenAI from 'openai';

interface GroupSummary {
  id: string;
  title: string;
  body: string;
  feedbackIds: number[];
}

interface Feedback {
  id: number;
  name: string;
  description: string;
  importance: string;
  type: string;
  customer: string;
  date: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateGroupSummary(feedbackGroup: Feedback[]): Promise<Omit<GroupSummary, 'id' | 'feedbackIds'>> {
  const feedbackText = feedbackGroup.map(f => 
    `${f.name}: ${f.description} (Importance: ${f.importance}, Type: ${f.type}, Customer: ${f.customer})`
  ).join('\n');

  const prompt = `you are making a summary of the problems/feedback that a company has collected from its customers, represented in json below, and grouping them together by individual problem, theme, or challenge encountered in the feedback. We want a quick "title" to describe what the problem/theme/challenge is, and a more in depth description for the body. We also want the IDs of every piece of feedback associated with that group. Here's the data I want you to summarize:

${feedbackText}

Respond with a JSON object in the following format:
[
    {
      id: '1',
      title: 'Performance Issues',
      body: 'Multiple customers reported slow response times and system lag.',
      feedbackIds: [1, 5, 12, 18],
    },
    {
      id: '2',
      title: 'Feature Requests',
      body: 'Customers are requesting new features to enhance productivity.',
      feedbackIds: [2, 7, 15, 22],
    },
  ]`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 250,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No content received from OpenAI");
  }

  return JSON.parse(content);
}

async function openAIGrouping(feedback: Feedback[]): Promise<GroupSummary[]> {
  const groups: { [key: string]: Feedback[] } = {};
  feedback.forEach(item => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type].push(item);
  });

  const summaries: GroupSummary[] = [];
  let id = 1;

  for (const [_, feedbackGroup] of Object.entries(groups)) {
    const { title, body } = await generateGroupSummary(feedbackGroup);
    summaries.push({
      id: id.toString(),
      title,
      body,
      feedbackIds: feedbackGroup.map(f => f.id),
    });
    id++;
  }

  return summaries;
}

function simulateOpenAIGrouping(feedback: typeof json): GroupSummary[] {
  const groups: GroupSummary[] = [
    {
      id: '1',
      title: 'Data Ingestion and Processing Speed',
      body: 'Multiple customers reported slow ingestion times and the need for faster data processing, especially when dealing with large datasets.',
      feedbackIds: [1, 38],
    },
    {
      id: '2',
      title: 'Support for File Formats and Data Import',
      body: 'Customers requested additional file format support, specifically for CSV files, and improvements in the data import process to avoid errors.',
      feedbackIds: [2, 13, 26, 45],
    },
    {
      id: '3',
      title: 'Bug Fixes in Data Handling and System Stability',
      body: 'Several bugs were reported, ranging from data mapping errors to synchronization and system freezing issues.',
      feedbackIds: [3, 10, 31, 39, 41],
    },
    {
      id: '4',
      title: 'Dashboard and UI Enhancements',
      body: 'Users expressed concerns about the dashboard layout, requesting a cleaner interface and fixes for various UI glitches.',
      feedbackIds: [4, 6, 18, 47],
    },
    {
      id: '5',
      title: 'Feature Requests for Enhanced Analytics and Reporting',
      body: 'Customers are requesting new features, such as real-time analytics, data visualization options, predictive analysis, and automated reporting.',
      feedbackIds: [5, 7, 14, 19, 23, 46],
    },
    {
      id: '6',
      title: 'User Access, Permissions, and Security',
      body: 'Feedback highlighted the need for improved user access control, including SSO, role-based access, and stronger data security.',
      feedbackIds: [17, 30, 33, 40],
    },
    {
      id: '7',
      title: 'Customer Support and Training Materials',
      body: 'Customers asked for better training materials and user onboarding, including tutorials and a clearer API documentation.',
      feedbackIds: [21, 32, 48],
    },
    {
      id: '8',
      title: 'Bugs Affecting Core Functionality',
      body: 'There were several reports about bugs affecting key functionality, like user profile saving errors, notification delays, and session timeout problems.',
      feedbackIds: [6, 15, 20, 35],
    },
    {
      id: '9',
      title: 'Advanced Search and Filtering Capabilities',
      body: 'Customers want more advanced filtering and search capabilities for better data management and precise queries.',
      feedbackIds: [27, 36],
    },
    {
      id: '10',
      title: 'Globalization and Multilingual Support',
      body: 'Requests were made for support of multiple languages to cater to a broader global audience.',
      feedbackIds: [9],
    },
  ];

  return groups;
}

async function runBatchProcess() {
  try {
    let groups: GroupSummary[];
    
    // Leaving here for easy testing with local data
    // groups = simulateOpenAIGrouping(json);
    groups = await openAIGrouping(json);

    fs.writeFileSync(
      path.join(__dirname, 'groupSummaries.json'),
      JSON.stringify(groups, null, 2)
    );
    console.log('Batch process completed. Group summaries updated.');
  } catch (error) {
    console.error('Error in batch process:', error);
  }
}

runBatchProcess();
