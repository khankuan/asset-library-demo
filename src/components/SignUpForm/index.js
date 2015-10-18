import React from 'react';

import Button from '../Button';
import TextField from '../TextField';

export default class SignUpForm extends React.Component {

  static propTypes = {
    onSignUp: React.PropTypes.func.isRequired,
  }

  _handleSignUp = () => {
    if (this.props.onSignUp) {
      this.props.onSignUp(this.refs.email.getValue(), this.refs.password.getValue(),
                          this.refs.name.getValue());
    }
  }

  render() {
    return (
      <div className="signup-form">
        <TextField ref="name" type="text" />
        <TextField ref="email" type="text" />
        <TextField ref="password" type="password" />
        <Button onClick={ this._handleSignUp } >Sign Up</Button>
      </div>
    );
  }
}
