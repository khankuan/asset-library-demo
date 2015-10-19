import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', (props) => {
  const alt = props.alt;
  const store = alt.getStore('Asset').getState();
  const assetId = props.params.assetId;

  //  Always fetch data when initially loaded
  const promise = alt.getActions('Asset').get(assetId).then(() => {}, () => {});

  if (!store.assets[assetId]) {
    return promise; //  But only require to resolve if data was not there before
  }
})
export default class AssetPage extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
    params: React.PropTypes.object,
  }

  render() {
    return (
      <AltContainer stores={{
        CategoryPageStore: this.context.alt.getStore('CategoryPage'),
        AssetStore: this.context.alt.getStore('Asset'),
      }}>
        <Component {...this.props}/>
      </AltContainer>
    );
  }

}
