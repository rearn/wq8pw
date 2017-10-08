import unittest
import dbi
from pymongo import MongoClient


class test_dbi(unittest.TestCase):
    def setUp(self):
        with MongoClient('mongodb://localhost/testdb') as client:
            db = client.testdb
            db_uri = db.uri
            db_uri.insert_one({'id': 0, 'uri': 'http://example.com/'})
            db_uri.insert_one({'id': 1, 'uri': 'http://example.org/test.html'})
            db_uri.insert_one({'id': 'uri_id', 'seq': 2})
        self.db = dbi.dbi('mongodb://localhost/testdb', 'testdb')

    def test_find_uri(self):
        self.assertTrue(self.db.find_uri(0), 'http://example.com/')
        self.assertTrue(self.db.find_uri(1), 'http://example.org/test.html')
        self.assertIsNone(self.db.find_uri(42))

    def test_find_id(self):
        self.assertTrue(self.db.find_id('http://example.com/'), 0)
        self.assertTrue(self.db.find_id('http://example.org/test.html'), 1)
        self.assertIsNone(self.db.find_id('http://example.org/none.html'))

    def test_update(self):
        self.assertTrue(self.db.update('http://example.com/'), 0)
        self.assertTrue(self.db.update('http://example.org/test.html'), 1)
        ret = self.db.find_id('http://example.net/')
        self.assertTrue(self.db.find_uri(ret), 'http://example.net/')
        self.assertTrue(self.db.find_id('http://example.net/'), ret)
        self.assertTrue(self.db.update('http://example.net/'), ret)
