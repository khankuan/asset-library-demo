import React from 'react';
import Text from '../../components/Text';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import LikeButton from '../../components/LikeButton';

export default class LikeList extends React.Component {

  static propTypes = {
    LikeListStore: React.PropTypes.object,
    UserStore: React.PropTypes.object,
    assetId: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _handleLikeClick = () => {
    this.context.alt.getActions('Asset').likeAsset(this.props.assetId);
  }

  renderUser(user, index) {
    return (
      <li key={index}>
        <Text size="huge" bold block>Likers</Text>
        <Text size="large" padding="base">
          <Link to={`/users/${user.id}/likes`}>{user.name}</Link>
        </Text>
      </li>
    );
  }

  renderUsers(users) {
    return users.map((user, index) => {
      return this.renderUser(user, index);
    });
  }

  render() {
    const userIds = this.props.LikeListStore.likeList[this.props.assetId];
    if (!userIds) {
      return (
        <Loading />
      );
    }

    const users = userIds.map(userId => { return this.props.UserStore.users[userId]; });

    if (users.length === 0) {
      return (
        <Text padding="base">
          Nobody likes this yet. Be the first!
          <LikeButton liked={false} onClick={ this._handleLikeClick }/>
        </Text>
      );
    }

    return (
      <ul className="like-list">
        { this.renderUsers(users) }
      </ul>
    );
  }
}
