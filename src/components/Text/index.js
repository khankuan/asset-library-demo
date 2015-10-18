import cx from 'classnames';
import React from 'react';

export default class Text extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    bold: React.PropTypes.bool,
    italics: React.PropTypes.bool,
    underline: React.PropTypes.bool,
    size: React.PropTypes.string,
    padding: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  static defaultProps = {
    size: 'base',
    padding: 'none',
  }

  getClasses() {
    return cx(
      {
        'bold': this.props.bold,
        'italics': this.props.italics,
        'underline': this.props.underline,
      },
      'text-size-' + this.props.size,
      'text-padding-' + this.props.padding,
      this.props.className
    );
  }

  render() {
    return (
      <span className={ this.getClasses() }>
        { this.props.children }
      </span>
    );
  }
}
