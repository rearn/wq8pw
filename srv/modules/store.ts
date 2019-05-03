import { Des } from './des';
import { Db } from './dbi';
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
  };
}

const env = process.env.NODE_ENV as string;
const config = (allConfig as Iconfig)[env];
export const c: Des =  new Des(new Uint8Array(
  config.des.key.split('').map((v) => v.charCodeAt(0)),
));
export const db: Db = new Db(config.db.uri);
export const passwd: Map<string, string> = new Map([
  ['rearn', 'aaa'],
  ['min', 'ccc'],
]);
