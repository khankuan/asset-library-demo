export default class User {
  constructor(request) {
    this.request = request;
  }

  signIn(email, password) {
    return this.request.post('/users/signin', {
      data: { email, password },
    });
  }

  signUp(email, password, name) {
    return this.request.post('/users/signup', {
      data: { email, password, name },
    });
  }

  me() {
    return this.request.get('/users/me');
  }

  getUser(userId) {
    return this.request.get('/users/' + userId);
  }
}
