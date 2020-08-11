const conf = require('./config.json');

module.exports = Object.entities(conf.uniquely).map((v) => {
  return {
    name: v[0],
    host: v[1].db.host,
    username: v[1].db.username,
    password: v[1].db.password,
    database: v[1].db.database,
  };
}).map((v) => Object.assign(v, conf.common.db));
