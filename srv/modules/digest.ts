// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import crypto from 'crypto';
import { base64 } from 'rfc4648';
import { passwd } from './store';

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeaderu = req.get('Authorization');
  const authHeader: string = authHeaderu !== undefined ? authHeaderu : '';
  if (authHeader !== undefined && authHeader.slice(0, 6) === 'Digest') {
    const paramsArray: string[] = authHeader.slice(6).trim().split(/\s*,\s*/);
    const paramsKvArray: Array<[string, string]> = paramsArray.map((value) => {
      const ret = value.split(
        /\s*=(?:(?=[^"]*"[^"]*")|(?!"))\s*/,
        2,
      ).map((v2) => v2.replace(/^"/, '').replace(/"$/, ''));
      return [ret[0], ret[1]];
    });
    const params: {[s: string]: string} = (() => {
      const t: {[s: string]: string} = {};
      paramsKvArray.forEach((value) => {
        // eslint-disable-next-line prefer-destructuring
        t[value[0]] = value[1];
      });
      return t;
    })();
    const calams = [
      'username',
      'realm',
      'nonce',
      'uri',
      'cnonce',
      'nc',
      'qop',
      'response',
    ];
    if (calams.filter((value) => !(value in params)).length === 0) {
      const algorithm = params.algorithm || 'MD5';
      const {
        username,
        realm,
        nonce,
        uri,
        cnonce,
        nc,
        qop,
        response,
      } = params;

      const hashFunc = (): crypto.Hash => {
        if (algorithm === 'MD5') {
          return crypto.createHash('md5');
        }
        if (algorithm === 'SHA-256') {
          return crypto.createHash('sha256');
        }
        return crypto.createHash('sha512-256');
      };

      const hashHex = (str: string) => hashFunc().update(
        str,
        'utf8',
      ).digest('hex');

      if (passwd.has(username)) {
        const a1 = [username, realm, passwd.get(username)].join(':');
        const a1hash = hashHex(a1);
        const a2 = [req.method, uri].join(':');
        const a2hash = hashHex(a2);
        const a3 = [a1hash, nonce, nc, cnonce, qop, a2hash].join(':');
        const a3hash = hashHex(a3);
        if (response === a3hash) {
          next();
          return;
        }
      }
    }
  }

  const rand = () => Math.floor(Math.random() * 0x100);
  const nonce2 = base64.stringify((new Uint8Array(24)).map(rand));
  const opaque2 = base64.stringify((new Uint8Array(24)).map(rand));
  const v = [
    'Digest realm="http-auth@example.org"',
    'qop="auth"',
    'algorithm=SHA-256',
    `nonce="${nonce2}"`,
    `opaque="${opaque2}"`,
  ];
  const w = [
    'Digest realm="http-auth@example.org"',
    'qop="auth"',
    'algorithm=MD5',
    `nonce="${nonce2}"`,
    `opaque="${opaque2}"`,
  ];
  res.append('WWW-Authenticate', w.join(', '));
  res.append('WWW-Authenticate', v.join(', '));
  res.status(401).end();
};
