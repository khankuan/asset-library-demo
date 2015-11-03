import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Card from '../Card';

export default class GridView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return (
        <div className="grid-animate">
          <div className="grid-item" key={child.key}>
            { child }
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Card className="grid" depth={2}>
        <ReactCSSTransitionGroup transitionName="grid-animate" transitionEnterTimeout={500} transitionLeaveTimeout={500} >
          { this.renderChildren() }
        </ReactCSSTransitionGroup>
      </Card>
    );
  }
}
