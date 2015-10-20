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

  if (likesPageStore.fetchState === null ||
      likesPageStore.likesUserId !== props.params.likesUserId) {
    promises.push(alt.getActions('LikesPage').fetchUserLikes(props.params.likesUserId).then(() => {}, () => {}));
  }

  if (!userStore.users[props.params.likesUserId]) {
    promises.push(alt.getActions('User').get(props.params.likesUserId).then(() => {}, () => {}));
  }

  if (promises.length > 0) {
    return Promise.all(promises).then(() => {}, () => {});
  }
})
export default class LikesPage extends React.Component {

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
    routeParams: React.PropTypes.object,
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
