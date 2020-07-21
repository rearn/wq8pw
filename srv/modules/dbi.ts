import { getRepository } from 'typeorm';
import { Wq8pw } from 'srv/entity/Wq8pw';

export const findUri = async (id: number) => {
  const wq8pwRepositry = getRepository(Wq8pw);
  const idList = await wq8pwRepositry.findOne({
    where: { id },
  });
  return idList;
};

export const findId = async (uri: string, antenna: boolean) => {
  const wq8pwRepositry = getRepository(Wq8pw);
  const idList = await wq8pwRepositry.findOne({
    select: ['id'],
    where: { uri, antenna },
  });
  return idList;
};

const stringint2uint = (v: string) => {
  const a = BigInt(v);
  const m = BigInt(0xffffffff);
  return new Uint32Array([Number(a / m), Number(a % m)]);
};

export const update = async (uri: string, antenna: boolean) => {
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

