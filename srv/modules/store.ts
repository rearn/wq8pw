import { Des } from './des';
import { Dbi } from './dbi';
import allConfig from '../../config.json';
import env from './env';

interface Iconfig {
  [key: string]: {
    des: {
      key: string;
    };
    recaptcha: {
      use: boolean;
      secretkey: string;
      sitekey: string;
    };
    master: {
      auth: Array<{
        user: string;
        pass: string;
      }>;
    };
  };
}

const config = (allConfig.uniquely as Iconfig)[env];
export const { recaptcha } = config;
export const c: Des = new Des(new Uint8Array(
  config.des.key.split('').map((v) => v.charCodeAt(0)),
));
export const dbi: Dbi = new Dbi(env);
export const passwd: Map<string, string> = new Map(
  config.master.auth.map((v) => [v.user, v.pass] as [string, string]),
);
