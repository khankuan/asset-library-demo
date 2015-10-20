import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', (props) => {
  const alt = props.alt;
  const store = alt.getStore('CategoryPage').getState();
  if (store.fetchState === null ||
      store.category !== props.params.category) {
    return alt.getActions('CategoryPage').fetchCategory(props.params.category).then(() => {}, () => {});
  }
})
export default class CategoryPage extends React.Component {

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
