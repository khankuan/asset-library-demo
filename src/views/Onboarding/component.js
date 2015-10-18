import React from 'react';

import Modal from '../../components/Modal';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';

export default class OnboardingPage extends React.Component {

  static propTypes = {
    AuthStore: React.PropTypes.object,
    OnboardingStore: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _handleSignIn = (email, password) => {
    this.context.alt.getActions('Auth').signIn(email, password);
  }

  _handleSignUp = (email, password, name) => {
    this.context.alt.getActions('Auth').signUp(email, password, name);
  }

  _handleClose = () => {
    this.context.alt.getActions('Onboarding').requestClose();
  }

  render() {
    if (this.props.AuthStore.authUser === undefined) {
      return null;
    }

    if (this.props.OnboardingStore.show === 'signin') {
      return (
        <Modal onClose={ this._handleClose }>
          <SignInForm
            onSignIn={ this._handleSignIn }
            loading={ this.props.AuthStore.signInState === 'LOADING' } />
        </Modal>
      );
    } else if (this.props.OnboardingStore.show === 'signup') {
      return (
        <Modal onClose={ this._handleClose }>
          <SignUpForm
            onSignUp={ this._handleSignUp }
            loading={ this.props.AuthStore.signUpState === 'LOADING' } />
        </Modal>
      );
    }

    return null;
  }

}
