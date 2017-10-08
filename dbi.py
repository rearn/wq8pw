from pymongo import MongoClient


class dbi():
    def __init__(self, uri, db_name):
        self.__client = MongoClient(uri)
        self.__db = self.__client[db_name]

    def find_uri(self, id):
        db_uri = self.__db.uri
        ret = list(db_uri.find({'id': id}, {'id': False, 'uri': True}))
        if len(ret) == 1:
            return ret[0]['uri']
        else:
            return None

    def find_id(self, uri):
        db_uri = self.__db.uri
        ret = list(db_uri.find({'uri': uri}, {'id': True, 'uri': False}))
        if len(ret) == 1:
            return ret[0]['id']
        else:
            return None

    def update(self, uri):
        id = self.find_id(uri)
        if id is not None:
            return id
        else:
            db_counters = self.__db.counters
            ret = list(
                db_counters.find_and_modify(
                    {'id': 'uri_id'},
                    {'$inc': {'seq': 1}}
                )
            )
            id = ret[0]['seq']
            db_uri = self.__db.uri
            if len(db_uri.find({'id': id})) == 0:
                db_uri.insert_one({'id': id, 'uri': uri})
                return id
            else:  # pragma: no cover
                raise Exception()
