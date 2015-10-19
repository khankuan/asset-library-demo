import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', ({ alt }) => {
  const store = alt.getStore('Auth').getState();
  if (store.authUser === undefined && store.meState !== 'PENDING') {
    return alt.getActions('Auth').me().then(() => {}, () => {});
  }
})
export default class NavBar extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <AltContainer stores={{
        AuthStore: this.context.alt.getStore('Auth'),
      }}>
        <Component {...this.props} />
      </AltContainer>
    );
  }

}
