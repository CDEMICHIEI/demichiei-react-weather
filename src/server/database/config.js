import Sequelize from 'sequelize';
import env from '../config/env';

const sequelize = new Sequelize(env.database.schema, env.database.username, env.database.password, {
  host: env.database.host,
  port: env.database.port,
  dialect: env.database.dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
