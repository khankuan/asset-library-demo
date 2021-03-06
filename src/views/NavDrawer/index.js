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
export default class NavDrawer extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <AltContainer stores={{
        AuthStore: this.context.alt.getStore('Auth'),
        NavDrawerStore: this.context.alt.getStore('NavDrawer'),
      }}>
        <Component />
      </AltContainer>
    );
  }

}
