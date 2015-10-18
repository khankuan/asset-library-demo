
export default class AuthActions {
  constructor(api) {
    this.api = api;
  }

  signUp(email, password, name) {
    this.dispatch({ email, password, name });
  }
}
