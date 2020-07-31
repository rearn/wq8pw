import { Des } from './des';
import { Dbi } from './dbi';
import allConfig from '../../config.json';
interface Iconfig {
  [key: string]: {
    db: {
      uri: string;
      name: string;
    };
    des: {
      key: string;
    };
    recaptcha: {
      use: boolean;
    };
    master: {
      auth: Array<{
        user: string;
        pass: string;
      }>;
    };
  };
}

export const env = process.env.NODE_ENV as string;
const config = (allConfig as Iconfig)[env];
export const c: Des =  new Des(new Uint8Array(
  config.des.key.split('').map((v) => v.charCodeAt(0)),
));
export const dbi: Dbi = new Dbi(env);
export const passwd: Map<string, string> = new Map(
  config.master.auth.map((v) => [v.user, v.pass] as [string, string]),
);
