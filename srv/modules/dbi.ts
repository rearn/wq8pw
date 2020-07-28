import { getRepository } from 'typeorm';
import { Wq8pw } from '../entity/Wq8pw';
import { beginConnection } from 'srv/dbConnection';

const uint2stringint = (v: Uint32Array) => {
  const u = BigInt(v[0]);
  const l = BigInt(v[1]);
  const m = BigInt(0x100000000);
  const a = u * m + l;
  return a.toString();
};

export const findAll = async () => {
  await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw);
  const idList = await wq8pwRepositry.find({});
  return idList;
};

export const findUri = async (id: Uint32Array) => {
  await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw);
  const idList = await wq8pwRepositry.findOne({
    where: { id: uint2stringint(id) },
  });
  return idList;
};

export const findId = async (uri: string, antenna: boolean) => {
  await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw);
  const idList = await wq8pwRepositry.findOne({
    select: ['id'],
    where: { uri, antenna },
  });
  return idList;
};

export const stringint2uint = (v: string) => {
  const a = BigInt(v);
  const m = BigInt(0x100000000);
  return new Uint32Array([Number(a / m), Number(a % m)]);
};

export const update = async (uri: string, antenna: boolean) => {
  await beginConnection();
  const find = await findId(uri, antenna);
  if (find !== undefined) {
    return stringint2uint(find.id);
  }
  // const wq8pwRepositry = getRepository(Wq8pw);
  const a = new Wq8pw();
  a.uri = uri;
  a.antenna = antenna;
  a.save();
  return stringint2uint(a.id);
};

