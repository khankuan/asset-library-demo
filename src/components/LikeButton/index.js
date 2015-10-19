import React from 'react';
import cx from 'classnames';

import Button from '../Button';
import Text from '../Text';

export default class LikeButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    liked: React.PropTypes.bool,
    className: React.PropTypes.string,
  }

  getClasses() {
    const liked = this.props.liked;

    return cx(liked ? 'liked' : 'not-liked', this.props.className);
  }

  render() {
    const liked = this.props.liked;

    return (
      <Button {...this.props} className={ this.getClasses() } type="flat">
        <Text bold>{liked ? 'Liked' : 'Like'}</Text>
        { this.props.children }
      </Button>
    );
  }
}
