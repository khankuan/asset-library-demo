import React from 'react';

import Button from '../Button';
import TextField from '../TextField';

export default class SignInForm extends React.Component {

  static propTypes = {
    onSignIn: React.PropTypes.func.isRequired,
  }

  _handleSignIn = () => {
    if (this.props.onSignIn) {
      this.props.onSignIn(this.refs.email.getValue(), this.refs.password.getValue());
    }
  }

  render() {
    return (
      <div className="signin-form">
        <TextField ref="email" type="text" />
        <TextField ref="password" type="password" />
        <Button onClick={ this._handleSignIn }>Sign In</Button>
      </div>
    );
  }
}
