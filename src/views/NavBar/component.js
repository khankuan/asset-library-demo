import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Text from '../../components/Text';
import Button from '../../components/Button';

export default class NavBar extends React.Component {

  static propTypes = {
    AuthStore: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props);
  }

  _handleSignIn = () => {
    this.context.alt.getActions('Onboarding').requestSignIn();
  }

  _handleSignUp = () => {
    this.context.alt.getActions('Onboarding').requestSignUp();
  }

  _handleProfile = () => {
    this.context.alt.getActions('NavDrawer').toggleNavDrawer();
  }

  _handleUploadClick = () => {
    ReactDOM.findDOMNode(this.refs.upload).click();
  }

  _handleUpload = (event) => {
    const file = event.target.files[0];
    this.context.alt.getActions('Asset').create(file);
  }

  renderSignUp() {
    return (
      <li>
        <Button type="flat" onClick={ this._handleSignUp }>
          Sign Up
        </Button>
      </li>
    );
  }

  renderSignIn() {
    return (
      <li>
        <Text size="tiny">
          <Button type="flat" size="tiny" onClick={ this._handleSignIn }>
             Already have account? Sign In
          </Button>
        </Text>
      </li>
    );
  }

  renderProfileButton(authUser) {
    return (
      <li>
        <Button type="flat" onClick={ this._handleUploadClick }>
          +
          <input
            ref="upload"
            style={{display: 'none'}}
            type="file"
            accept="image/*,audio/*"
            onChange={ this._handleUpload }
            value="" />
        </Button>
        <Button type="flat" onClick={ this._handleProfile }>
           Hi, { authUser.name }
        </Button>
      </li>
    );
  }

  render() {
    const authUser = this.props.AuthStore.authUser;

    return (
      <div className="nav">
        <ul className="nav-left">
          <li><strong><Link to="/">Home</Link></strong></li>
          <li><strong><Link to="/category/audio">Audio</Link></strong></li>
          <li><strong><Link to="/category/image">Images</Link></strong></li>
        </ul>
        <ul className="nav-right">
          {!authUser ? this.renderSignUp() : null}
          {!authUser ? this.renderSignIn() : null}
          {authUser ? this.renderProfileButton(authUser) : null}
        </ul>
      </div>
    );
  }

}
