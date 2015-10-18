
export default class AuthStore {
  constructor() {
    const AuthActions = this.alt.getActions('AuthActions');
    
    this.bindListeners({
      handleSignUp: AuthActions.SIGN_UP,
    });
  }

  handleSignUp() {
    console.log('sign up');
  }
}
