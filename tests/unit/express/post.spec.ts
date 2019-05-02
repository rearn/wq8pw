/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';

describe('POST', () => {
  it('400', () => {
    return request(app).post('/api/v1/accept/post').expect(400);
  });
});
