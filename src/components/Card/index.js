import React from 'react';
import cx from 'classnames';

export default class Card extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    depth: React.PropTypes.oneOf([1, 2, 3]),
  }

  static defaultProps = {
    depth: 1,
  }

  getClasses() {
    return cx('card-depth-' + this.props.depth, this.props.className);
  }

  render() {
    return (
      <div {...this.props} className={ this.getClasses() }>
        { this.props.children }
      </div>
    );
  }
}
