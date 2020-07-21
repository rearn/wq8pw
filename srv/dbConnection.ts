/**
 * @file DB 関連の関数群
 */
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { logger, TypeOrmWinstonLogger } from './logger';

let connection: Connection|null = null;

/**
 * DB への接続
 */
export const beginConnection = async () => {
  if (connection === null) {
    const v = await getConnectionOptions();
    connection = await createConnection(
      Object.assign(v, {
        logger: new TypeOrmWinstonLogger(true),
      }),
    );
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
