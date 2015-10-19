import React from 'react';

import Onboarding from '../Onboarding';
import NavBar from '../NavBar';
import NavDrawer from '../NavDrawer';

export default class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        <Onboarding />
        <NavBar />
        <NavDrawer />

        { this.props.children }
      </div>
    );
  }
}
