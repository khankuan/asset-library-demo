import sequelize from './db.js';

import Asset from './Asset.js';
import User from './User.js';

const Like = sequelize.define('Like', {});

Asset.belongsToMany(User, { through: Like, as: 'likedBy', foreignKey: 'assetId' });
User.belongsToMany(Asset, { through: Like, as: 'likedAssets', foreignKey: 'userId' });

module.exports = Like;
