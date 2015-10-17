import sequelize from './db.js';
import crypto from 'crypto';

import User from './User.js';

const Session = sequelize.define('Session', {}, {
  instanceMethods: {
    generateToken: function () {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(256, (ex, buf) => {
          this.token = buf.toString('hex');
          resolve();
        });
      });
    },
  },
  hooks: {
    beforeCreate: function (session) {
      return session.generateToken();
    },
  },
});

Session.belongsTo(User);

module.exports = Session;
