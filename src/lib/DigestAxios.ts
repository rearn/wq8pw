import axios, { AxiosStatic, AxiosRequestConfig } from 'axios';
import { sha256 } from '@/plugins/js-sha256';

export class DigestAxios {
  private readonly axios: AxiosStatic;
  constructor() {
    this.axios = axios;
  }

  public get(path: string, config?: AxiosRequestConfig) {
    return axios.get(path, config).catch(this.getWwwAuth).then((wwwAuth) => {
      return this.getAuthHeader(wwwAuth, 'GET', path, config).then((c) => axios.get(path, c));
    });
  }

  public post(path: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(path, data, config).catch(this.getWwwAuth).then((wwwAuth) => {
      return this.getAuthHeader(wwwAuth, 'POST', path, config).then((c) => axios.post(path, data, c));
    });
  }

  public put(path: string, data?: any, config?: AxiosRequestConfig) {
    return axios.put(path, data, config).catch(this.getWwwAuth).then((wwwAuth) => {
      return this.getAuthHeader(wwwAuth, 'PUT', path, config).then((c) => axios.put(path, data, c));
    });
  }

  public delete(path: string, config?: AxiosRequestConfig) {
    return axios.delete(path, config).catch(this.getWwwAuth).then((wwwAuth) => {
      return this.getAuthHeader(wwwAuth, 'DELETE', path, config).then((c) => axios.delete(path, c));
    });
  }

  private getWwwAuth(r: any) {
    return r.response.headers['www-authenticate'];
  }

  private async getAuthHeader(authHeader: string, method: string, url: string, config?: AxiosRequestConfig) {
    const paramsString: string[] = authHeader.split(/\s*,?\s*Digest\s*/).filter((v) => v !== '');
    const paramsArray: string[][] = paramsString.map((v) => v.split(/\s*,(?=(?:[^"]*"[^"]*")*$)\s*/));
    const paramsKvArray: Array<Array<[string, string]>> = paramsArray.map<Array<[string, string]>>((v) => {
      return v.map<[string, string]>((value) => {
        const ret = value.split(/\s*=(?:(?=[^"]*"[^"]*")|(?!"))\s*/, 2).map((v2) => {
          return v2.replace(/^"/, '').replace(/"$/, '');
        });
        return [ret[0], ret[1]];
      });
    });
    const paramsMapArray: Array<{[s: string]: string}> = paramsKvArray.map((v) => {
      const t: {[s: string]: string} = {};
      v.forEach((w) => t[w[0]] = w[1]);
      return t;
    });
    const calams = ['realm', 'nonce', 'qop', 'opaque'];
    const paramsSha256 = paramsMapArray.filter((v) => 'algorithm' in v ? v.algorithm === 'SHA-256' : false);
    const paramsCalamsOk = paramsSha256.filter((v) => calams.filter((value) => ! (value in v)).length === 0);
    if (paramsCalamsOk.length === 0) {
      throw new Error('Auth params error.');
    }
    const params: {[s: string]: string} = paramsCalamsOk[0];
    const username: string = 'rearn';
    const passwd: string = 'aaa';
    const realm: string = params.realm;
    const nonce: string = params.nonce;
    const uri: string = url;
    const cnonce: string = Array(8).map(() => Math.random().toString(36).slice(-8)).join('');
    const nc: string = '0001';
    const qop: string = params.qop.split(/\s*,\s*/).filter((v) => v !== '')[0];
    const opaque: string = params.opaque;

    const hashHex = ((): (str: string) => Promise<string> => {
      if (window.crypto.subtle === undefined) {
        return async (str: string): Promise<string> => sha256(str);
      }
      return async (str: string): Promise<string> => {
        const b = str.split('').map((c: string): number => c.charCodeAt(0));
        const ab = await window.crypto.subtle.digest({name: 'SHA-256'}, new Uint8Array(b));
        return Array.from(new Uint8Array(ab)).map((v) => ('00' + v.toString(16)).substr(-2)).join('');
      };
    })();

    const hashHexArray = (data: string[]) => {
      return hashHex(data.join(':'));
    };
    const a1 = [username, realm, passwd];
    const a2 = [method, uri];
    const [a1hash, a2hash] = await Promise.all([hashHexArray(a1), hashHexArray(a2)]);
    const a3 = [a1hash, nonce, nc, cnonce, qop, a2hash];
    const a3hash = await hashHexArray(a3);
    const dh: {[s: string]: string} = {
      realm,
      nonce,
      uri,
      username,
      cnonce,
      nc,
      qop,
      algorithm: 'SHA-256',
      response: a3hash,
      opaque,
    };

    const Authorization = 'Digest ' + Object.keys(dh).map((v) => v + '=' + '"' + dh[v] + '"').join(', ');
    if (config === undefined) {
      return {headers: {Authorization}};
    }
    config.headers.Authorization = Authorization;
    return config;
  }
}
