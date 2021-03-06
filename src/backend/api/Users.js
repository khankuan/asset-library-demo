
const UserApi = {
  _createSession: (req, user) => {
    return req.models.Session.create({
      userId: user.id,
    }).then(session => {
      req.session = session;
      return session;
    });
  },

  hasSession: (req, res, next) => {
    if (!req.session || !req.session.userId) {
      next('You are not logged in');
    } else {
      next();
    }
  },

  populateSession: (req, res, next) => {
    const token = req.cookies ? req.cookies.token : '';
    if (!token) {
      next();
      return null;
    }

    return req.models.Session.findOne({ token })
      .then(session => {
        req.session = session;
      })
      .finally(() => {
        next();
      });
  },

  signIn: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let user;
    return req.models.User.findOne({ email })
      .then(_user => {
        user = _user;
        return user.hasPasswordEquals(password);
      })
      .then(() => {
        return UserApi._createSession(req, user);
      })
      .then(session => {
        res.cookie('token', session.token);
        res.status(200).send(user.toObject());
      })
      .catch(err => {
        next(err);
      });
  },

  signUp: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    let user;
    return req.models.User.create({ email, password, name })
      .then(_user => {
        user = _user;
        return UserApi._createSession(req, user);
      })
      .then(session => {
        res.cookie('token', session.token);
        res.status(200).send(user.toObject());
      }, next);
  },

  signOut: (req, res, next) => {
    return req.models.Session.findById(req.session.id)
      .then(session => {
        return session.destroy();
      })
      .then(() => {
        res.cookie('token', '');
        res.status(200).send();
      }, next);
  },

  me: (req, res, next) => {
    return req.models.User.findById(req.session.userId)
      .then(user => {
        res.status(200).send(user.toObject());
      }, next);
  },

  get: (req, res, next) => {
    return req.models.User.findById(req.params.userId)
      .then(user => {
        if (user) {
          res.status(200).send(user.toProfile());
        } else {
          res.status(404).send('User not found');
        }
      }, next);
  },
};

module.exports = UserApi;
