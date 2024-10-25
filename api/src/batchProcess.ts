import fs from 'fs';
import path from 'path';
import json from './data.json';

interface GroupSummary {
  id: string;
  title: string;
  body: string;
  feedbackIds: number[];
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

function runBatchProcess() {
  const groups = simulateOpenAIGrouping(json);
  fs.writeFileSync(
    path.join(__dirname, 'groupSummaries.json'),
    JSON.stringify(groups, null, 2)
  );
  console.log('Batch process completed. Group summaries updated.');
}

runBatchProcess();
