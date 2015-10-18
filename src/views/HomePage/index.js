import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', ({ alt }) => {
  const store = alt.stores.HomePage.getState();
  if (store.newestAssetIds === null) {
    return alt.getActions('HomePage').fetchNewest().then(() => {}, () => {});
  }
})
export default class HomePage extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <AltContainer stores={{
        HomePageStore: this.context.alt.getStore('HomePage'),
        AssetStore: this.context.alt.getStore('Asset'),
      }}>

        <Component />

      </AltContainer>
    );
  }

}
