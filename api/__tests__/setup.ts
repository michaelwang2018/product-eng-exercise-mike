import { beforeAll, afterAll, afterEach, vi } from 'vitest';

// If you need to mock any modules, you can do it here
vi.mock('../src/data.json', () => ({
  default: [
    {
      id: 1,
      name: "Test Feedback",
      description: "This is a test feedback item",
      importance: "High",
      type: "Sales",
      customer: "Loom",
      date: "2023-01-01"
    },
    // Add more mock data as needed
  ]
}));

vi.mock('../src/groupSummaries.json', () => ({
  default: [
    {
      id: "group1",
      title: "Test Group",
      body: "This is a test group",
      feedbackIds: [1]
    },
    // Add more mock group data as needed
  ]
}));

beforeAll(() => {
  // This runs before all tests
  console.log('Starting tests...');
});

afterAll(() => {
  // This runs after all tests
  console.log('All tests completed.');
});

afterEach(() => {
  // This runs after each test
  // Clear all mocks after each test
  vi.clearAllMocks();
});
