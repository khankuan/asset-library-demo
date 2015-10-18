export default class AuthApi {
  constructor(request) {
    this.request = request;
  }

  signIn(email, password) {
    return this.request.post('/api/users/signin')
      .send({ email, password });
  }
}
