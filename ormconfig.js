const conf = require('./config.json');

module.exports = Object.entries(conf.uniquely).map((v) => {
  return {
    name: v[0],
    host: v[1].db.host,
    username: v[1].db.username,
    password: v[1].db.password,
    database: v[1].db.database,
  };
}).map((v) => Object.assign(v, conf.common.db));
