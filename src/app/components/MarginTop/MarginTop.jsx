import React from 'react';

export default class MarginTop extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const marginTopValue = [
      this.props.marginTopValue, 
      this.props.marginTopUnit
    ].join('');
    return (
      <div style={ {marginTop : marginTopValue} }></div>
    );
  }
}

MarginTop.propTypes = {
  marginTopValue	: React.PropTypes.number,
  marginTopUnit		: React.PropTypes.string
};

MarginTop.defaultProps = {
  marginTopValue      : 20,
  marginTopUnit       : 'px'
};
