import base64_32
import dbi
import des
from flask import abort, Flask, json, redirect, render_template, request
from flask import url_for
from configparser import ConfigParser
from urllib.parse import urlparse
import urllib.request


app = Flask(__name__)

config = ConfigParser()
config.read('wq8pw.ini')

crypt = des.des(config['des']['key'])
db_uri = config['db']['uri']
db_name = config['db']['name']
use_recaptcha = config['recaptcha'].getboolean('use')
recaptcha_key = config['recaptcha']['key']


def is_url(uri):
    o = urlparse(uri)
    return len(o.scheme) > 0


@app.route('/')
def root():
    root = {
        'name': 'wq8pw',
    }
    return render_template('root.ja.html', root=root)


@app.route('/robots.txt')
def robots():
    return render_template('robots.txt')


@app.route('/accept/post', methods=['GET', 'POST'])
def accept_post():
    if request.method == 'POST':
        uri = request.form['uri']
        if (not is_url(uri)):
            return abort(400)
        redirect_type = 1 if request.form.get('jamp_flag') else 0
        if use_recaptcha:  # pragma: no cover
            recaptcha_ret = request.form.get('g-recaptcha-response')
            recaptcha_uri = 'https://www.google.com/recaptcha/api/siteverify' \
                            '?secret=%s&response=%s' \
                            % (recaptcha_key, recaptcha_ret)
            with urllib.request.urlopen(recaptcha_uri) as response:
                ret = json.loads(response.read())
            if (not ret['success']):
                return abort(403)
        db = dbi.dbi(db_uri, db_name)
        num = db.update(uri, redirect_type)
        code = crypt.encode(num)
        base32 = base64_32.base32encode(code)
        base64 = base64_32.base64encode(code)
        uri13 = url_for('path', base=base32, _external=True, _scheme='https')
        uri11 = url_for('path', base=base64, _external=True, _scheme='https')
        root = {'uri13': uri13, 'uri11': uri11}
        return render_template('post.ja.html', root=root)
    else:
        return redirect(
            url_for('root', _external=True, _scheme='https'),
            code=301
        )


@app.route('/<string:base>')
def path(base):
    if len(base) == 11:
        code = base64_32.base64decode(base)
    elif len(base) == 13:
        code = base64_32.base32decode(base)
    else:
        return abort(404)
    if code is None:
        return abort(404)
    num = crypt.decode(code)
    db = dbi.dbi(db_uri, db_name)
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
            return redirect(uri['uri'], code=301)
        else:
            return render_template('antenna.ja.html', root=uri)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
