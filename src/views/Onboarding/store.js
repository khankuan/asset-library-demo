//  Similar to NavDrawer
export default class OnboardingStore {
  constructor() {
    const OnboardingActions = this.alt.getActions('Onboarding');
    const AuthActions = this.alt.getActions('Auth');

    this.bindListeners({
      onRequestSignIn: OnboardingActions.requestSignIn,
      onRequestSignUp: OnboardingActions.requestSignUp,
      onRequestClose: OnboardingActions.requestClose,
      onSignInSuccess: AuthActions.signInSuccess,
      onSignUpSuccess: AuthActions.signUpSuccess,
    });

    this.state = {
      show: false,
    };
  }

  onRequestSignIn() { this.setState({ show: 'signin' }); }
  onRequestSignUp() { this.setState({ show: 'signup' }); }
  onRequestClose() { this.setState({ show: null }); }
  onSignInSuccess() { this.setState({ show: null }); }
  onSignUpSuccess() { this.setState({ show: null }); }
}
