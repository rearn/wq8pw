import { getRepository, BaseEntity } from 'typeorm';
import { Wq8pw } from '../entity/Wq8pw';
import { beginConnection } from '../dbConnection';
import { env } from './store';

const uint2stringint = (v: Uint32Array) => {
  if (v[0] === 0) {
    return v[1].toString();
  }
  const n = 0x10000;
  const m = 10000000000;

  const u = Math.floor(v[0] / n);
  const l = v[0] - u * n;
  const ll =  l * n * n + v[1];
  if (u === 0) {
    return ll.toString();
  }
  const a = u * n * n;
  const b = Math.floor(a / m);
  const c = a - b * m;
  const cnll = c * n + ll;
  const cnllD = Math.floor(cnll / m);
  const cnllM = cnll - cnllD * m;
  const uStr = (b * n + cnllD).toString();
  const lStr = cnllM.toString().padStart(m.toString().length - 1, '0');
  return uStr.concat(lStr);
};

export const findAll = async () => {
  const conn = await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw, env);
  const idList = await wq8pwRepositry.find({});
  return idList;
};

export const findUri = async (id: Uint32Array) => {
  const conn = await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw, env);
  const idList = await wq8pwRepositry.findOne({
    where: { id: uint2stringint(id) },
  });
  return idList;
};

export const findId = async (uri: string, antenna: boolean) => {
  const conn = await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw, env);
  const idList = await wq8pwRepositry.findOne({
    select: ['id'],
    where: { uri, antenna },
  });
  return idList;
};

export const stringint2uint = (v: string) => {
  if (v.length >= 10) {
    const a = parseInt(v.slice(0, 10), 10);
    // tslint:disable-next-line:no-shadowed-variable
    const b = v.slice(10).split('').map((v) => parseInt(v, 10));
    let c = Math.floor(a / 0xffffffff);
    let d = a - c * 0xffffffff;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < b.length; i++) {
      d += b[i] * 10;
      const e = Math.floor(d / 0xffffffff);
      d -= e * 0xffffffff;
      c = c * 10 + e;
    }
    return new Uint32Array([c, d]);
  }
  return new Uint32Array([0, parseInt(v, 10)]);
};

export const update = async (uri: string, antenna: boolean) => {
  const conn = await beginConnection();
  const find = await findId(uri, antenna);
  if (find !== undefined) {
    return stringint2uint(find.id);
  }
  // const wq8pwRepositry = getRepository(Wq8pw);
  const a = new Wq8pw();
  a.uri = uri;
  a.antenna = antenna;
  BaseEntity.useConnection(conn);
  await a.save();
  const find2 = await findId(uri, antenna);
  if (find2 !== undefined) {
    return stringint2uint(find2.id);
  }
  throw new Error('ありえないはず');
};

