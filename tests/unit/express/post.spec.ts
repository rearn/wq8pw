/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';
import mongoose from 'mongoose';
import { db } from 'srv/modules/store';
/*
    def setUp(self):
        with MongoClient('mongodb://test:test@localhost/test') as client:
            db = client.test
            db_uri = db.uri
            db_uri.insert_one({'id': 0, 'uri': 'http://example.com/', 'type': 0})
            db_uri.insert_one({'id': 1, 'uri': 'http://example.org/test.html', 'type': 1})
            db_cs = db.counters
            db_cs.insert_one({'id': 'uri_id', 'seq': 2})
        self.db = dbi.dbi('mongodb://test:test@localhost/test', 'test')

    def tearDown(self):
        with MongoClient('mongodb://test:test@localhost/test') as client:
            client.drop_database('test')
*/
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
