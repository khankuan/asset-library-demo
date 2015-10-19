import React from 'react';

import Card from '../Card';

export default class GridView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) => {
      return (
        <div className="grid-item" key={index}>
          { child }
        </div>
      );
    });
  }

  render() {
    return (
      <Card className="grid" depth={2}>
        { this.renderChildren() }
      </Card>
    );
  }
}
