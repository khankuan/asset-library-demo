import React from 'react';

export default class Modal extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    onClose: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-close" onClick={ this.props.onClose }>
          X
        </div>
        { this.props.children }
      </div>
    );
  }
}
