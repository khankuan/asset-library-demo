import sequelize from './db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  name: { type: 'string' },
  email: {
    type: 'string',
    unique: true,
    required: true,
  },
  password: {
    type: 'string',
    minLength: 1,
    required: true,
  },
}, {
  instanceMethods: {
    //  Check access to user
    hasPasswordEquals: function (password) {
      const user = this;
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    },
    toObject: function () {
      const data = this.toJSON();
      delete data.password;
      return data;
    },

    toProfile: function () {
      const data = this.toObject();
      delete data.email;
      return data;
    },
    //  Generate password
    generateEncryptedPassword: function () {
      return new Promise((resolve, reject) => {
        bcrypt.hash(this.password, 10, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            this.password = hash;
            resolve();
          }
        });
      });
    },
  },
  // Lifecycle Callbacks
  hooks: {
    beforeCreate: function(user) {
      return user.generateEncryptedPassword();
    },

    beforeUpdate: function(user) {
      return user.generateEncryptedPassword();
    },
  },
});

module.exports = User;
