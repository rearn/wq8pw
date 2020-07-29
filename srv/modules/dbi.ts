import { getRepository, BaseEntity } from 'typeorm';
import { Wq8pw } from '../entity/Wq8pw';
import { beginConnection } from './dbConnection';
import { env } from './store';

export const findAll = async () => {
  const conn = await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw, env);
  const idList = await wq8pwRepositry.find({});
  return idList;
};

export const findUri = async (id: string) => {
  const conn = await beginConnection();
  const wq8pwRepositry = getRepository(Wq8pw, env);
  const idList = await wq8pwRepositry.findOne({
    where: { id },
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

export const update = async (uri: string, antenna: boolean) => {
  const conn = await beginConnection();
  const find = await findId(uri, antenna);
  if (find !== undefined) {
    return find.id;
  }
  // const wq8pwRepositry = getRepository(Wq8pw);
  const a = new Wq8pw();
  a.uri = uri;
  a.antenna = antenna;
  BaseEntity.useConnection(conn);
  await a.save();
  return a.id;
};

