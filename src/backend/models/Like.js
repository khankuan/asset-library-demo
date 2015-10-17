import sequelize from './db.js';

import Asset from './Asset.js';
import User from './User.js';

const Like = sequelize.define('Like', {});

Asset.belongsToMany(User, { through: Like });
User.belongsToMany(Asset, { through: Like });

module.exports = Like;
