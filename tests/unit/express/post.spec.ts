/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';
import mongoose from 'mongoose';

const removeCollection = () => {
  const connection = mongoose.connection;
  const collections = connection.collections;
  const removeList = [];
  for (const i in collections) {
    if (collections.hasOwnProperty(i)) {
      removeList.push(collections[i].remove({}));
    }
  }
  return Promise.all(removeList);
};

beforeAll(removeCollection);

beforeEach(async () => {
  const connection = mongoose.connection;
  const collections = connection.collections;
  const uri = connection.createCollection('test');
  const counters = connection.createCollection('counters');
  await Promise.all([uri, counters]);
  const uriInsert = collections.test.insertMany([
    {id: 0, uri: 'http://example.com/', type: 0},
    {id: 1, uri: 'http://example.org/test.html', type: 1},
  ]);
  const countersInsert = collections.counters.insertMany([
    {id: 'uri_id', seq: 2},
    {id: 'uri_add_id', seq: 0},
  ]);
  return Promise.all([uriInsert, countersInsert]);
});

afterEach(removeCollection);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST', () => {
  it('400', () => {
    return request(app).post('/api/v1/accept/post').expect(400);
  });
});
