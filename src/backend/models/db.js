import Sequelize from 'sequelize';

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

module.exports = sequelize;
