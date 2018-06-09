from pymongo import MongoClient
from configparser import ConfigParser


config = ConfigParser()
config.read('wq8pw.ini')

with MongoClient(config['db']['uri']) as client:
    db = client.admin
    db_uri = db.uri
    ret = list(db_uri.find({'id': 0}))
    if len(ret) == 1:
        exit()
    db_uri.insert_one({'id': 0, 'uri': 'http://example.com/', 'type': 0})
    db_cs = db.counters
    db_cs.insert_one({'id': 'uri_id', 'seq': 1})
