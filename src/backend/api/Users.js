
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
    next(req.session && req.session.userId ? null : 'You are not logged in');
  },

  populateSession: (req, res, next) => {
    return req.models.Session.findOne({ token: req.cookie ? req.cookie.token : '' })
      .then(session => {
        req.session = session;
      }).finally(() => {
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
        return user.hasPasswordsEquals(password);
      })
      .then(UserApi._createSession.bind(null, req))
      .then(session => {
        res.send({ token: session.token, user: user.toObject() });
      }, next);
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
        res.send({ token: session.token, user: user.toObject() });
      }, next);
  },

  signOut: (req, res, next) => {
    return req.models.Session.findById(req.session.id)
      .then(session => {
        return session.destroy();
      })
      .then(() => {
        res.send();
      }, next);
  },

  me: (req, res, next) => {
    return req.models.User.findById(req.session.userId)
      .then(user => {
        res.send(user.toObject());
      }, next);
  },

  get: (req, res, next) => {
    return req.models.User.findById(req.params.userId)
      .then(user => {
        res.send(user.toProfile());
      }, next);
  },
};

module.exports = UserApi;
