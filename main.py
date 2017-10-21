import base64_32
import dbi
import des
from flask import abort, Flask, redirect


app = Flask(__name__)


@app.route('/')
def root():
    pass


@app.route('/<string:base>')
def path(base):
    if len(base) == 11:
        code = base64_32.base64decode(base)
    elif len() == 13:
        code = base64_32.base32decode(base)
    else:
        return abort(404)
    if code is None:
        return abort(404)
    num = crypt.decode(code)
    uri = db.find_uri(num)
    app.logger.debug({'base': base, 'code': code, 'num': num, 'uri': uri})
    if uri is None:
        return abort(404)
    else:
        return redirect(uri, code=301)


if __name__ == '__main__':
    crypt = des.des('12345678')
    db = dbi.dbi('mongodb://localhost/flaskdb', 'flaskdb')
