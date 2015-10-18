
export default function(api) {
  return class OnboardingActions {
    constructor() {
      this.generateActions('requestSignIn', 'requestSignUp', 'requestClose');
    }
  };
}

