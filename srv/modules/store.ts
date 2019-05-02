import { Des } from './des';
import { Db } from './dbi';

export const c: Des =  new Des(new Uint8Array([
  97, 98, 99, 100, 101, 102, 103, 104,
]));
// export const db: Db = new Db('mongodb://test:test@mongo:27017/admin');
export const db: Db = new Db('mongodb://test:test@localhost:27017/admin');
export const passwd: Map<string, string> = new Map([
  ['rearn', 'aaa'],
  ['min', 'ccc'],
]);
