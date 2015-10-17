
import Sequelize from 'sequelize';
import sequelize from './db.js';

const Asset = sequelize.define('Asset', {
  category: { type: 'string' },
  title: { type: 'string' },
  contentType: { type: 'string' },
  data: { type: Sequelize.BLOB },
}, {
  instanceMethods: {
    getCategory: function () {
      return this.contentType.substring(this.contentType.indexOf('/'));
    },
  },

  // Lifecycle Callbacks
  hooks: {
    beforeCreate: function (asset) {
      asset.category = asset.getCategory();
    },

    beforeUpdate: function (asset) {
      asset.category = asset.getCategory();
    },
  },
});

module.exports = Asset;
