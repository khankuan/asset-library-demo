import React from 'react';

import Button from '../Button';
import TextField from '../TextField';
import Text from '../Text';

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
        <Text block bold size="large">Welcome onboard!</Text>
        <TextField ref="name" type="text" placeholder="Your Name"/>
        <br/>
        <TextField ref="email" type="text" placeholder="Your Email"/>
        <br/>
        <TextField ref="password" type="password" placeholder="Your Password"/>
        <br/>
        <Button onClick={ this._handleSignUp } >Sign Up</Button>
      </div>
    );
  }
}
