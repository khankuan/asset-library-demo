import React from 'react';
import ReactDOM from 'react-dom';
import {TransitionMotion, spring, presets} from 'react-motion';

import Card from '../Card';

export default class GridView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    itemWidth: React.PropTypes.number,
    itemHeight: React.PropTypes.number,
    spacing: React.PropTypes.number,
  }

  static defaultProps = {
    itemWidth: 240,
    itemHeight: 240,
    spacing: 20,
  }

  constructor(props) {
    super(props);
  }

  state = {}

  componentDidMount() {
    const width = ReactDOM.findDOMNode(this).parentNode.offsetWidth;
    if (width !== this.state.width) {
      this.setState({ width });
    }
  }

  renderChildren(interpolatedStyles) {
    let index = 0;
    return Object.keys(interpolatedStyles).map(key => {
      const item = interpolatedStyles[key];
      const {width, height, opacity, scale} = item;
      const pos = this._getPositionForIndex(index);
      index++;

      const transform = `scale(${scale}, ${scale})`;

      return (
        <div className="grid-item" key={key} style={{
          height: height + 'px',
          width: width + 'px',
          opacity,
          transform,
          left: pos.x + 'px',
          top: pos.y + 'px',
        }}>
          { item.data.child }
        </div>
      );
    });
  }

  _getPositionForIndex(index) {
    const spacing = this.props.spacing;
    const width = this.props.itemWidth + spacing;
    const height = this.props.itemHeight + spacing;
    const countPerRow = Math.floor(this.state.width / width);
    return {
      x: width * (index % countPerRow) + spacing,
      y: height * Math.floor(index / countPerRow) + spacing,
    };
  }

  getStyles() {
    const configs = {};

    React.Children.forEach(this.props.children, (child, index) => {
      configs['id:' + child.key] = {
        opacity: spring(1),
        scale: spring(1),
        width: this.props.itemWidth,
        height: this.props.itemHeight,
        data: {
          child,
          index,
        },
      };
    });
    return configs;
  }

  willEnter(key, item) {
    return {
      opacity: spring(0),
      scale: spring(0),
      data: item.data,
    };
  }

  willLeave(key, item) {
    return {
      opacity: spring(0),
      scale: spring(0),
      data: item.data,
    };
  }

  render() {
    if (!this.state.width) {
      return <div />;
    }

    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {
          interpolatedStyles => {
            let minHeight;
            const spacing = this.props.spacing;
            const itemWidth = this.props.itemWidth + spacing;
            const itemHeight = this.props.itemHeight + spacing;
            if (this.state.width) {
              const countPerRow = Math.floor(this.state.width / itemWidth);
              minHeight = Math.ceil(Object.keys(interpolatedStyles).length / countPerRow) * itemHeight + spacing;
            }

            return (
              <Card className="grid" depth={2} style={{position: 'relative', minHeight}}>
                { this.renderChildren(interpolatedStyles) }
              </Card>
            );
          }
        }
      </TransitionMotion>
    );
  }
}
