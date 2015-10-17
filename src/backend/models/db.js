import Sequelize from 'sequelize';

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite',
});

module.exports = sequelize;
