//  Authentication store: Contains all authentication/session states

export default class AuthStore {
  constructor() {
    const AuthActions = this.alt.getActions('AuthActions');

    this.bindListeners({
      onSignUp: AuthActions.signUp,
      onSignUpSuccess: AuthActions.signUpSuccess,
      onSignUpError: AuthActions.signUpError,
      onSignIn: AuthActions.signIn,
      onSignInSuccess: AuthActions.signInSuccess,
      onSignInError: AuthActions.signInError,
      onMe: AuthActions.me,
      onMeSuccess: AuthActions.meSuccess,
      onMeError: AuthActions.meError,
    });

    this.state = {
      authUser: undefined,
      meState: null,
      signUpState: null,
      signInState: null,
      meError: null,
      signUpError: null,
      signInError: null,
    };
  }

  onSignUp() { this.setState({signUpState: 'PENDING'}); }
  onSignUpSuccess(user) { this.setState({signUpState: null, authUser: user}); }
  onSignUpError(error) { this.setState({signUpState: 'ERROR', signUpError: error}); }

  onSignIn() { this.setState({signInState: 'PENDING'}); }
  onSignInSuccess(user) { this.setState({signInState: null, authUser: user}); }
  onSignInError(error) { this.setState({signInState: 'ERROR', signInError: error}); }

  onMe() { this.setState({meState: 'PENDING'}); }
  onMeSuccess(user) { this.setState({meState: null, authUser: user}); }
  onMeError(error) { this.setState({meState: 'ERROR', meError: error, authUser: this.state.authUser || null}); }
}
