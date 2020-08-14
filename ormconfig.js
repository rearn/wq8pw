import config from './config.json';

export default Object.entries(config.uniquely).map((v) => ({
  name: v[0],
  host: v[1].db.host,
  username: v[1].db.username,
  password: v[1].db.password,
  database: v[1].db.database,
})).map((v) => Object.assign(v, config.common.db));
