import React from 'react';
import cx from 'classnames';

export default class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    type: React.PropTypes.string,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  static defaultProps = {
    type: 'primary',
    size: 'base',
  }

  _getClasses() {
    return cx(
      'btn',
      'btn-size-' + this.props.size,
      'btn-type-' + this.props.type,
      this.props.className,
    );
  }

  render() {
    return (
      <button { ...this.props } className={ this._getClasses() }>
        { this.props.children }
      </button>
    );
  }
}
