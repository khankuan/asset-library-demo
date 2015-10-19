import React from 'react';
import { Link } from 'react-router';

import Button from '../../components/Button';

export default class NavDrawer extends React.Component {

  static propTypes = {
    AuthStore: React.PropTypes.object,
    NavDrawerStore: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _handleSignOut = () => {
    this.context.alt.getActions('Auth').signOut();
  }

  render() {
    if (!this.props.NavDrawerStore.show) {
      return null;
    }
    const authUser = this.props.AuthStore.authUser;

    return (
      <div className="nav-drawer">
        <ul className="nav-drawer-items">
          <li><Link to={`/user/${authUser.id}/likes`}>My Likes</Link></li>
          <li><Button type="flat" onClick={ this._handleSignOut }>Sign out</Button></li>
        </ul>
      </div>
    );
  }

}
