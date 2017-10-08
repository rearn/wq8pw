from pymongo import MongoClient


class dbi():
    def __init__(self, uri, db_name):
        self.__client = MongoClient(uri)
        self.__db = self.__client[db_name]

    def find_uri(self, uri_id):
        db_uri = self.__db.uri
        ret = list(db_uri.find({'id': uri_id}))
        print(ret)
        if len(ret) == 1:
            return ret[0]['uri']
        else:
            return None

    def find_id(self, uri):
        db_uri = self.__db.uri
        ret = list(
            db_uri.find({'uri': uri}))
        if len(ret) == 1:
            return int(ret[0]['id'])
        else:
            return None

    def update(self, uri):
        uri_id = self.find_id(uri)
        if uri_id is not None:
            return uri_id
        else:
            db_cs = self.__db.counters
            ret = db_cs.find_and_modify({'id': 'uri_id'}, {'$inc': {'seq': 1}})
            uri_id = ret['seq']
            db_uri = self.__db.uri
            if self.find_uri(uri_id) is None:
                db_uri.insert_one({'id': uri_id, 'uri': uri})
                return uri_id
            else:  # pragma: no cover
                raise Exception()
