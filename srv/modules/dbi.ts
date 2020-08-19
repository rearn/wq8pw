import {
  getRepository,
  BaseEntity,
  Connection,
  getConnectionOptions,
  getConnectionManager,
} from 'typeorm';
import { Wq8pw } from '../entity/Wq8pw';
import { TypeOrmWinstonLogger, logger } from './logger';

export default class Dbi {
  protected connection: Connection|null = null;

  protected connectionName: string;

  constructor(name: string) {
    this.connectionName = name;
  }

  /**
   * DB への接続
   */
  public async beginConnection() {
    if (this.connection === null) {
      const v = await getConnectionOptions(this.connectionName);
      this.connection = await getConnectionManager().create(
        Object.assign(v, {
          logger: new TypeOrmWinstonLogger(true),
        }),
      ).connect();
      logger.info('Connection DB');
    }
    return this.connection;
  }

  /**
   * DB との切断
   */
  public async closeConnection() {
    if (this.connection !== null) {
      await this.connection.close();
      logger.info('disconnection DB');
      this.connection = null;
    }
    return this.connection;
  }

  public async findAll() {
    await this.beginConnection();
    const wq8pwRepositry = this.getRepositoryWq8pw();
    const idList = await wq8pwRepositry.find({});
    return idList;
  }

  public async findUri(id: string) {
    await this.beginConnection();
    const wq8pwRepositry = this.getRepositoryWq8pw();
    const idList = await wq8pwRepositry.findOne({
      where: { id },
    });
    return idList;
  }

  public async findId(uri: string, antenna: boolean) {
    await this.beginConnection();
    const wq8pwRepositry = this.getRepositoryWq8pw();
    const idList = await wq8pwRepositry.findOne({
      select: ['id'],
      where: { uri, antenna },
    });
    return idList;
  }

  public async update(uri: string, antenna: boolean) {
    const conn = await this.beginConnection();
    const find = await this.findId(uri, antenna);
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
  }

  protected getRepositoryWq8pw() {
    return getRepository(Wq8pw, this.connectionName);
  }
}
