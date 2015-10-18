
export default class AuthStore {
  constructor() {
    const AuthActions = this.alt.getActions('AuthActions');

    this.bindListeners({
      handleSignUp: AuthActions.SIGN_UP,
    });

    this.state = {
      authUser: null,
    };
  }

  handleSignUp() {
    console.log('sign up');
  }
}
