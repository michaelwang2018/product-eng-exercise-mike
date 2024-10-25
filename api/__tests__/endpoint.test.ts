import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { router } from '../src/endpoint';

const app = express();
app.use('/api', router);

describe('Endpoint Tests', () => {
  describe('POST /api/query', () => {
    it('should return all feedback when no filters are applied', async () => {
      const response = await request(app)
        .post('/api/query')
        .send({ filters: {}, selectedGroupId: null });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter feedback by importance', async () => {
      const response = await request(app)
        .post('/api/query')
        .send({ filters: { importance: ['High'] }, selectedGroupId: null });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.every((item: any) => item.importance === 'High')).toBe(true);
    });

    it('should filter feedback by selected group', async () => {
      const groupResponse = await request(app)
        .post('/api/groups')
        .send({ filters: {} });

      const groupId = groupResponse.body.data[0].id;

      const response = await request(app)
        .post('/api/query')
        .send({ filters: {}, selectedGroupId: groupId });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data.every((item: any) => 
        groupResponse.body.data[0].feedbackIds.includes(item.id)
      )).toBe(true);
    });
  });

  describe('POST /api/groups', () => {
    it('should return all group summaries when no filters are applied', async () => {
      const response = await request(app)
        .post('/api/groups')
        .send({ filters: {} });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter group summaries based on feedback filters', async () => {
      const response = await request(app)
        .post('/api/groups')
        .send({ filters: { importance: ['High'] } });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      // This test assumes that there are group summaries with high importance feedback
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});