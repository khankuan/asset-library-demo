import React from 'react';

//  Pulls alt as context
export default function(alt) {
  return (ComposedComponent) => class WithAlt extends React.Component {
    static childContextTypes = {
      alt: React.PropTypes.object.isRequired,
    }

    getChildContext() {
      return { alt };
    }

    render() {
      if (ComposedComponent.props) {
        return ComposedComponent;
      }

      return (
        <ComposedComponent {...this.props} />
      );
    }
  };
}
