/**
 * @file DB 関連の関数群
 */
import { getConnectionOptions, Connection, getConnectionManager } from 'typeorm';
import { logger, TypeOrmWinstonLogger } from '../logger';
import { env } from './store';

let connection: Connection|null = null;

/**
 * DB への接続
 */
export const beginConnection = async () => {
  if (connection === null) {
    const v = await getConnectionOptions(env);
    connection = await getConnectionManager().create(
      Object.assign(v, {
        logger: new TypeOrmWinstonLogger(true),
      }),
    ).connect();
    logger.info('Connection DB');
  }
  return connection;
};

/**
 * DB との切断
 */
export const closeConnection = async () => {
  if (connection !== null) {
    await connection.close();
    logger.info('disconnection DB');
    connection = null;
  }
  return connection;
};
