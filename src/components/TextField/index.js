import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

export default class TextField extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    size: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'password']),
    className: React.PropTypes.string,
  }

  static defaultProps = {
    size: 'base',
  }

  getValue = () => {
    return ReactDOM.findDOMNode(this.refs.input).value;
  }

  _getClasses() {
    return cx(
      'textfield',
      'textfield-size-' + this.props.size,
      this.props.className,
    );
  }

  render() {
    return (
      <input ref='input' { ...this.props } className={ this._getClasses() }>
        { this.props.children }
      </input>
    );
  }
}
