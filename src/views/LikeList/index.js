import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', (props) => {
  const alt = props.alt;
  const store = alt.getStore('LikeList').getState();

  //  If first time, return a promise. Else, Fire an action to just update.
  if (!store.likeList[props.assetId] && store.likeListState[props.assetId] !== 'PENDING') {
    return alt.getActions('LikeList').fetchAssetLikedBy(props.assetId).then(() => {}, () => {});
  } else {
    //  Set timeout because somehow react-resolver causing the sequence to trigger 2 actions at once
    setTimeout(() => {
      alt.getActions('LikeList').fetchAssetLikedBy(props.assetId);
    }, 0);
  }
})
export default class LikeList extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <AltContainer stores={{
        LikeListStore: this.context.alt.getStore('LikeList'),
        UserStore: this.context.alt.getStore('User'),
      }}>
        <Component {...this.props}/>
      </AltContainer>
    );
  }

}
