module.exports = [
  {
    name: 'development',
    host: 'maria',
    username: 'docker',
    password: 'docker',
    database: 'test_database',
  },
  {
    name: 'test',
    host: 'localhost',
    username: 'test',
    password: 'test',
    database: 'test_database',
  },
  {
    name: 'production',
    host: 'maria',
    username: '',
    password: '',
    database: '',
  },
].map((v) => v.assign({
  type: 'mariadb',
  port: 3306,
  synchronize: false,
  logging: true,
  entities: [
    'srv/entity/**/*.ts',
  ],
  migrations: [
    'srv/migration/**/*.ts',
  ],
  subscribers: [
    'srv/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'srv/entity',
    migrationsDir: 'srv/migration',
    subscribersDir: 'srv/subscriber',
  }
}));
