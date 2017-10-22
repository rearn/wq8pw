import base64_32
import dbi
import des
from flask import abort, Flask, redirect, render_template, request, url_for
from configparser import ConfigParser


app = Flask(__name__)


@app.route('/')
def root():
    root = {
        'name': 'wq8pw',
    }
    return render_template('root.ja.html', root=root)


@app.route('/accept/post', methods=['GET', 'POST'])
def accept_post():
    if request.method == 'POST':
        uri = request.form['uri']
        redirect_type = 1 if request.form.get('jamp_flag') else 0
        num = db.update(uri, redirect_type)
        code = crypt.encode(num)
        base32 = base64_32.base64encode(code)
        base64 = base64_32.base32encode(code)
        root = {
            'uri13': url_for(path, base=base32),
            'uri11': url_for(path, base=base64),
        }
        return render_template('post.ja.html', root=root)
    else:
        redirect(url_for('root'), code=301)


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
    if uri is None:
        return abort(404)
    else:
        app.logger.debug({
            'base': base,
            'code': code,
            'num': num,
            'uri': uri['uri'],
            'type': uri['type']
        })
        if uri['type'] == 0:
            return redirect(uri, code=301)
        else:
            return render_template('antenna.ja.html', root=uri)


if __name__ == '__main__':
    config = ConfigParser()
    config.read('wq8pw.ini')

    crypt = des.des(config['des']['key'])
    db = dbi.dbi(config['db']['uri'], config['db']['name'])
