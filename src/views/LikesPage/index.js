import React from 'react';
import { resolve, context } from 'react-resolver';
import AltContainer from 'alt/AltContainer';

import Component from './component';

@context('alt')
@resolve('', (props) => {
  const alt = props.alt;
  const likesPageStore = alt.getStore('LikesPage').getState();
  const userStore = alt.getStore('User').getState();
  const promises = [];

  const likesUserId = props.params.likesUserId;

  if (likesPageStore.fetchState === null ||
      likesPageStore.likesUserId !== likesUserId) {
    promises.push(alt.getActions('LikesPage').fetchUserLikes(likesUserId).then(() => {}, () => {}));
  }

  if (!userStore.users[likesUserId]) {
    promises.push(alt.getActions('User').get(likesUserId).then(() => {}, () => {}));
  }

  if (promises.length > 0) {
    return Promise.all(promises).then(() => {}, () => {});
  }
})
export default class LikesPage extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
    params: React.PropTypes.object,
  }

  render() {
    return (
      <AltContainer stores={{
        LikesPageStore: this.context.alt.getStore('LikesPage'),
        AssetStore: this.context.alt.getStore('Asset'),
        UserStore: this.context.alt.getStore('User'),
      }}>
        <Component {...this.props}/>
      </AltContainer>
    );
  }

}
