from pymongo import MongoClient


class dbi():
    def __init__(self, uri, db_name):
        self.__client = MongoClient(uri)
        self.__db = self.__client[db_name]

    def find_uri(self, uri_id):
        db_uri = self.__db.uri
        if uri_id > 0xfffffffffffff:
            return None
        ret = list(db_uri.find({'id': uri_id}))
        if len(ret) == 1:
            return {'uri': ret[0]['uri'], 'type': ret[0]['type']}
        else:
            return None

    def find_id(self, uri):
        db_uri = self.__db.uri
        ret = []
        for d in db_uri.find({'uri': uri}):
            ret.append({'id': d['id'], 'type': d['id']})
        if len(ret) == 1 or len(ret) == 2:
            return ret
        else:
            return None

    def find_id_and_type(self, uri, redirect_type):
        db_uri = self.__db.uri
        ret = list(db_uri.find({'uri': uri, 'type': redirect_type}))
        if len(ret) == 1:
            return int(ret[0]['id'])
        else:
            return None

    def update(self, uri, redirect_type):
        uri_id = self.find_id_and_type(uri, redirect_type)
        if uri_id is not None:
            return uri_id
        else:
            db_cs = self.__db.counters
            ret = db_cs.find_and_modify({'id': 'uri_id'}, {'$inc': {'seq': 1}})
            uri_id = ret['seq']
            db_uri = self.__db.uri
            if self.find_uri(uri_id) is None:
                db_uri.insert_one(
                    {'id': uri_id, 'uri': uri, 'type': redirect_type}
                )
                return uri_id
            else:  # pragma: no cover
                raise Exception()
