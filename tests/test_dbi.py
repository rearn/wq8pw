import unittest
import dbi
from pymongo import MongoClient


class test_dbi(unittest.TestCase):
    def setUp(self):
        with MongoClient('mongodb://test:test@localhost/admin') as client:
            db = client.admin
            db_uri = db.uri
            db_uri.insert_one({'id': 0, 'uri': 'http://example.com/', 'type': 0})
            db_uri.insert_one({'id': 1, 'uri': 'http://example.org/test.html', 'type': 1})
            db_cs = db.counters
            db_cs.insert_one({'id': 'uri_id', 'seq': 2})
        self.db = dbi.dbi('mongodb://test:test@localhost/admin', 'testdb')

    def tearDown(self):
        with MongoClient('mongodb://test:test@localhost/admin') as client:
            client.drop_database('admin')

    def test_find_uri(self):
        self.assertEqual(self.db.find_uri(0), {'uri': 'http://example.com/', 'type': 0})
        self.assertEqual(self.db.find_uri(1), {'uri': 'http://example.org/test.html', 'type': 1})
        self.assertIsNone(self.db.find_uri(42))

    def test_find_id(self):
        self.assertEqual(self.db.find_id('http://example.com/'), [{'id': 0, 'type': 0}])
        self.assertEqual(self.db.find_id('http://example.org/test.html'), [{'id': 1, 'type': 1}])
        self.assertIsNone(self.db.find_id('http://example.org/none.html'))

    def test_find_id_and_type(self):
        self.assertEqual(self.db.find_id_and_type('http://example.com/', 0), 0)
        self.assertEqual(self.db.find_id_and_type('http://example.org/test.html', 1), 1)
        self.assertIsNone(self.db.find_id_and_type('http://example.org/test.html', 0))
        self.assertIsNone(self.db.find_id_and_type('http://example.org/none.html', 1))

    def test_update_changeless_type(self):
        self.assertEqual(self.db.update('http://example.com/', 0), 0)
        self.assertEqual(self.db.update('http://example.org/test.html', 1), 1)

    def test_update(self):
        ret = self.db.update('http://example.net/', 0)
        self.assertEqual(ret, 2)
        self.assertEqual(self.db.find_uri(ret), {'uri': 'http://example.net/', 'type': 0})
        self.assertEqual(self.db.find_id_and_type('http://example.net/', 0), ret)
        self.assertEqual(self.db.update('http://example.net/', 0), ret)

    def test_update_change_type(self):
        ret = self.db.update('http://example.com/', 1)
        self.assertEqual(ret, 2)
        self.assertEqual(self.db.find_uri(ret), {'uri': 'http://example.com/', 'type': 1})
        self.assertEqual(self.db.find_id_and_type('http://example.com/', 1), ret)
        self.assertEqual(self.db.update('http://example.com/', 1), ret)

    def test_find_uri_id_over_52bit(self):
        self.assertIsNone(self.db.find_uri(0xfffffffffffff))
        self.assertIsNone(self.db.find_uri(0x10000000000000))
