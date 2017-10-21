import base64_32
import dbi
import des
from flask import abort, Flask, redirect, request, url_for
from configparser import ConfigParser


app = Flask(__name__)


@app.route('/')
def root():
    pass


@app.route('/accept/post', methods=['GET', 'POST'])
def accept_post(arg):
    if request.method == 'POST':
        # request.form['date']
        pass
        redirect(url_for('accept_success'), code=303)
    else:
        redirect(url_for('root'), code=301)


@app.route('/accept/success')
def accept_success(arg):
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
    config = ConfigParser()
    config.read('wq8pw.ini')

    crypt = des.des(config['des']['key'])
    db = dbi.dbi(config['db']['uri'], config['db']['name'])
