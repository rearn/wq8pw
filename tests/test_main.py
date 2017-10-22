import unittest
import main
from pymongo import MongoClient


class test_main(unittest.TestCase):
    def setUp(self):
        with MongoClient('mongodb://travis:test@localhost/testdb') as client:
            db = client.testdb
            db_uri = db.uri
            db_uri.insert_one({'id': 0, 'uri': 'http://example.com/', 'type': 0})
            db_uri.insert_one({'id': 1, 'uri': 'http://example.org/test.html', 'type': 1})
            db_cs = db.counters
            db_cs.insert_one({'id': 'uri_id', 'seq': 2})
        self.app = main.app.test_client()

    def tearDown(self):
        with MongoClient('mongodb://travis:test@localhost/testdb') as client:
            client.drop_database('testdb')

    def test_root(self):
        rv = self.app.get('/')
        self.assertEqual(rv.status_code, 200)
        self.assertRegex(rv.data.decode(), '<h1>短縮URLサービス wq8pw にようこそ</h1>')

    def test_pass(self):
        pass

    def test_get_update(self):
        rv = self.app.get('/accept/post')
        self.assertEqual(rv.status_code, 301)

    def test_update_changeless_type(self):
        rv = self.app.post('/accept/post', data={'uri': 'http://example.com/'})
        self.assertEqual(rv.status_code, 200)
        print(rv.data.decode())  # debug

    def test_update_change_type(self):
        rv = self.app.post('/accept/post', data={'uri': 'http://example.com/', 'jamp_flag': 1})
        self.assertEqual(rv.status_code, 200)
        print(rv.data.decode())  # debug

    def test_update(self):
        rv = self.app.post('/accept/post', data={'uri': 'http://example.net/'})
        self.assertEqual(rv.status_code, 200)
        print(rv.data.decode())  # debug

    def test_update2(self):
        rv = self.app.post('/accept/post', data={'uri': 'http://example.org/test.html', 'jamp_flag': 1})
        self.assertEqual(rv.status_code, 200)
        print(rv.data.decode())  # debug

if __name__ == '__main__':
    unittest.main()
