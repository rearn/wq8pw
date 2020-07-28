import { DES } from 'simple-des-crypto';
import { uint32toUint8, uint8toUint32 } from 'type-array-convert';
import { base64url, base32 } from 'rfc4648';

export interface UriString {
  short: string;
  long: string;
}

export class Des {
  private des: DES;
  constructor(key: Uint8Array) {
    this.des = new DES(key);
  }

  public encrypt = (data: Uint32Array): UriString => {
    if (data.length !== 2) {
      throw new Error('data.length is not 2.');
    }
    const code: Uint8Array = this.des.encrypt(uint32toUint8(data));
    const short: string = base64url.stringify(code).slice(0, 11);
    const long: string = base32.stringify(code).slice(0, 13).toLowerCase();
    return {short, long};
  }

  public decrypt = (data: string): Uint32Array => {
    const code: Uint8Array = (() => {
      if (data.length === 11) {
        return base64url.parse(data, {out: Uint8Array, loose: true});
      } else if (data.length === 13) {
        return base32.parse(data, {out: Uint8Array, loose: true});
      } else {
        throw new Error('data.length is not 11 or 13.');
      }
    })();
    return uint8toUint32(this.des.decrypt(code));
  }
}
