/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';
import mongoose from 'mongoose';

describe('POST', () => {
  it('400', () => {
    return request(app).post('/api/v1/accept/post').expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
