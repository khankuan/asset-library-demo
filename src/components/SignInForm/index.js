import React from 'react';

import Button from '../Button';
import TextField from '../TextField';
import Text from '../Text';

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
        <Text block bold size="large">Good to see your back!</Text>
        <TextField ref="email" type="text" placeholder="Your Email"/>
        <br/>
        <TextField ref="password" type="password" placeholder="Your Password"/>
        <br/>
        <Button onClick={ this._handleSignIn }>Sign In</Button>
      </div>
    );
  }
}
